import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertyRegistrationSchema } from "@shared/schema";
import { analyzeProperty, getGhanaPropertyRegistry, askPropertyAssistant, getPropertyValuation } from "./openai";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Property registration submission
  app.post("/api/property-registrations", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertPropertyRegistrationSchema.parse(req.body);
      
      // Create the registration
      const registration = await storage.createPropertyRegistration(validatedData);
      
      res.json({
        success: true,
        registration: {
          referenceNumber: registration.referenceNumber,
          id: registration.id,
          createdAt: registration.createdAt,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  });

  // Get all registrations (admin endpoint)
  app.get("/api/property-registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllPropertyRegistrations();
      res.json({ registrations });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Get registration by reference number
  app.get("/api/property-registrations/:referenceNumber", async (req, res) => {
    try {
      const { referenceNumber } = req.params;
      const registration = await storage.getPropertyRegistrationByReference(referenceNumber);
      
      if (!registration) {
        res.status(404).json({
          success: false,
          message: "Registration not found",
        });
        return;
      }
      
      res.json({ registration });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // AI Property Analysis
  app.post("/api/analyze-property", async (req, res) => {
    try {
      const { location, propertyType, size, description } = req.body;
      const analysis = await analyzeProperty({ location, propertyType, size, description });
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: "Failed to analyze property" });
    }
  });

  // Ghana Property Registry Data
  app.get("/api/ghana-registry/:location", async (req, res) => {
    try {
      const { location } = req.params;
      const registryData = await getGhanaPropertyRegistry(location);
      res.json(registryData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Ghana registry data" });
    }
  });

  // AI Assistant Chat
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { question, context } = req.body;
      const response = await askPropertyAssistant(question, context);
      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: "Failed to get AI assistant response" });
    }
  });

  // Property Valuation
  app.post("/api/property-valuation", async (req, res) => {
    try {
      const { location, size, propertyType, features } = req.body;
      const valuation = await getPropertyValuation({ location, size, propertyType, features });
      res.json(valuation);
    } catch (error) {
      res.status(500).json({ error: "Failed to get property valuation" });
    }
  });

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), 'uploads', 'videos');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Configure multer for video uploads
  const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `video-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  });

  const videoUpload = multer({
    storage: videoStorage,
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024, // 10GB limit for large files
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = /mp4|avi|mov|wmv|mkv|webm|m4v/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only video files are allowed (MP4, AVI, MOV, WMV, MKV, WebM, M4V)'));
      }
    }
  });

  // Video upload endpoint with support for Google Drive URLs
  app.post("/api/upload-video", videoUpload.single('video'), async (req, res) => {
    try {
      const { title, description, category, googleDriveUrl, useGoogleDrive } = req.body;

      // Handle Google Drive URL submission
      if (useGoogleDrive && googleDriveUrl) {
        // Extract file ID from Google Drive URL
        const fileId = extractGoogleDriveFileId(googleDriveUrl);
        if (!fileId) {
          return res.status(400).json({ error: 'Invalid Google Drive URL format' });
        }

        const videoData = {
          id: Math.random().toString(36).substr(2, 9),
          filename: `gdrive-${fileId}`,
          originalName: title || 'Google Drive Video',
          title: title || 'Google Drive Video',
          description: description || '',
          category: category || 'general',
          size: 0, // Size unknown for Google Drive files
          mimetype: 'video/mp4',
          uploadedAt: new Date().toISOString(),
          url: convertToEmbedUrl(googleDriveUrl),
          isGoogleDrive: true,
          googleDriveFileId: fileId
        };

        return res.json({
          success: true,
          video: videoData,
          message: 'Google Drive video linked successfully'
        });
      }

      // Handle regular file upload
      if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded and no Google Drive URL provided' });
      }

      const videoData = {
        id: Math.random().toString(36).substr(2, 9),
        filename: req.file.filename,
        originalName: req.file.originalname,
        title: title || req.file.originalname,
        description: description || '',
        category: category || 'general',
        size: req.file.size,
        mimetype: req.file.mimetype,
        uploadedAt: new Date().toISOString(),
        url: `/videos/${req.file.filename}`,
        isGoogleDrive: false
      };

      res.json({
        success: true,
        video: videoData,
        message: 'Video uploaded successfully'
      });
    } catch (error) {
      console.error('Video upload error:', error);
      res.status(500).json({ 
        error: 'Failed to upload video',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Helper function to extract Google Drive file ID
  function extractGoogleDriveFileId(url: string): string | null {
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9-_]+)/,
      /id=([a-zA-Z0-9-_]+)/,
      /\/open\?id=([a-zA-Z0-9-_]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  // Helper function to convert Google Drive URL to embed format
  function convertToEmbedUrl(url: string): string {
    const fileId = extractGoogleDriveFileId(url);
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
  }

  // Serve uploaded videos
  app.use('/videos', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use('/videos', express.static(uploadsDir));

  // Get uploaded videos list
  app.get("/api/videos", async (req, res) => {
    try {
      const files = fs.readdirSync(uploadsDir);
      const videos = files
        .filter(file => /\.(mp4|avi|mov|wmv|mkv|webm|m4v)$/i.test(file))
        .map(file => {
          const filePath = path.join(uploadsDir, file);
          const stats = fs.statSync(filePath);
          return {
            filename: file,
            url: `/videos/${file}`,
            size: stats.size,
            uploadedAt: stats.birthtime.toISOString()
          };
        });

      res.json({ videos });
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  });

  // Foreign Bird Payment System API Endpoints
  app.post("/api/foreign-bird/process-payment", async (req, res) => {
    try {
      const { 
        transactionType, 
        reference, 
        currency, 
        amount, 
        encrypted, 
        escrow, 
        recipient, 
        note, 
        attachments,
        scheduledDate 
      } = req.body;

      // Generate transaction ID
      const transactionId = `FB${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      const paymentData = {
        id: transactionId,
        transactionType,
        reference,
        currency,
        amount: parseFloat(amount),
        encrypted: Boolean(encrypted),
        escrow: Boolean(escrow),
        recipient,
        note,
        attachments: attachments || 0,
        scheduledDate: scheduledDate || null,
        status: escrow ? 'pending_escrow' : 'processing',
        createdAt: new Date().toISOString(),
        processedAt: escrow ? null : new Date().toISOString()
      };

      // In production, integrate with actual payment processors
      // For now, simulate payment processing
      
      res.json({
        success: true,
        transaction: paymentData,
        message: encrypted ? 'Encrypted payment processed securely' : 'Payment processed successfully'
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Payment processing failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get transaction history
  app.get("/api/foreign-bird/transactions", async (req, res) => {
    try {
      // In production, fetch from database
      const transactions = [
        {
          id: 'FB1749309001ABC123',
          transactionType: 'DONATION & SAFETY',
          reference: 'Tithe',
          currency: 'GHS',
          amount: 200.00,
          encrypted: true,
          status: 'completed',
          createdAt: '2025-06-07T15:00:00Z'
        }
      ];
      
      res.json({ success: true, transactions });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
    }
  });

  // RBFS Platform API Endpoints
  app.post("/api/rbfs/register-organization", async (req, res) => {
    try {
      const { name, type, address, pastor, description, logo } = req.body;
      
      // Verify address against ARVIPOA property database
      const propertyVerification = await storage.getPropertyRegistrationByAddress(address);
      
      if (!propertyVerification) {
        return res.status(400).json({
          success: false,
          message: 'Address not found in ARVIPOA property database. Please register the property first.'
        });
      }

      const organizationId = `ORG${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      const organization = {
        id: organizationId,
        name,
        type,
        address,
        pastor,
        description,
        logo: logo || null,
        verified: true,
        arvipoa_property_id: propertyVerification.id,
        members: 0,
        branches: [],
        services: [],
        donations: [],
        createdAt: new Date().toISOString()
      };

      res.json({
        success: true,
        organization,
        message: 'Organization registered successfully with ARVIPOA property verification'
      });
    } catch (error) {
      console.error('Organization registration error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Organization registration failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Add organization member
  app.post("/api/rbfs/add-member", async (req, res) => {
    try {
      const { organizationId, name, email, phone, address } = req.body;
      
      const memberId = `MEM${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const membershipCardId = `CARD${Date.now()}${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
      
      const member = {
        id: memberId,
        organizationId,
        name,
        email,
        phone,
        address,
        membershipCard: membershipCardId,
        joinDate: new Date().toISOString(),
        contributions: 0,
        status: 'active'
      };

      res.json({
        success: true,
        member,
        message: 'Member added successfully'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to add member' 
      });
    }
  });

  // Process religious donation
  app.post("/api/rbfs/process-donation", async (req, res) => {
    try {
      const { organizationId, amount, currency, type, donor, encrypted } = req.body;
      
      const donationId = `DON${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      const donation = {
        id: donationId,
        organizationId,
        amount: parseFloat(amount),
        currency,
        type,
        donor: encrypted ? 'Anonymous' : donor,
        encrypted: Boolean(encrypted),
        date: new Date().toISOString(),
        processed_via: 'foreign_bird_payment',
        status: 'completed'
      };

      res.json({
        success: true,
        donation,
        message: 'Donation processed successfully via Foreign Bird Payment System'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Donation processing failed' 
      });
    }
  });

  // Generate membership card
  app.post("/api/rbfs/generate-membership-card", async (req, res) => {
    try {
      const { memberId, organizationId } = req.body;
      
      const cardData = {
        cardId: `CARD${Date.now()}${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        memberId,
        organizationId,
        qrCode: `https://arvipoa.com/verify/member/${memberId}`,
        issuedDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
        status: 'active',
        features: ['digital_access', 'donation_tracking', 'service_alerts']
      };

      res.json({
        success: true,
        card: cardData,
        message: 'Membership card generated successfully via ARVIPOA Smart Card System'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Card generation failed' 
      });
    }
  });

  // Schedule religious service
  app.post("/api/rbfs/schedule-service", async (req, res) => {
    try {
      const { organizationId, title, date, time, type, description, liveStream } = req.body;
      
      const serviceId = `SRV${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      
      const service = {
        id: serviceId,
        organizationId,
        title,
        date,
        time,
        type,
        description,
        liveStream: Boolean(liveStream),
        streamUrl: liveStream ? `https://arvipoa.com/stream/${serviceId}` : null,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };

      res.json({
        success: true,
        service,
        message: 'Service scheduled successfully'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Service scheduling failed' 
      });
    }
  });

  // Get organization dashboard data
  app.get("/api/rbfs/organization/:id/dashboard", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Simulate dashboard data
      const dashboardData = {
        organization: {
          id,
          totalMembers: 1250,
          totalBranches: 3,
          totalDonations: 45600.00,
          currency: 'GHS',
          monthlyGrowth: 12.5,
          upcomingServices: 4,
          activeLiveStreams: 0
        },
        recentActivity: [
          { type: 'donation', amount: 200, member: 'Anonymous', time: '2 hours ago' },
          { type: 'member_joined', member: 'John Doe', time: '5 hours ago' },
          { type: 'service_scheduled', service: 'Sunday Worship', time: '1 day ago' }
        ],
        upcomingServices: [
          { title: 'Sunday Service', date: '2025-06-08', time: '09:00', type: 'regular' },
          { title: 'Prayer Meeting', date: '2025-06-10', time: '18:00', type: 'regular' }
        ]
      };

      res.json({
        success: true,
        dashboard: dashboardData
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch dashboard data' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
