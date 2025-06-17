import { storage } from "./storage";
import { InsertAddressVerificationAttempt } from "@shared/schema";

export interface AddressVerificationResult {
  isAuthorized: boolean;
  reason: string;
  propertyOwnerId?: string;
  requiresNotification: boolean;
}

export class AddressVerificationService {
  
  /**
   * Verifies if a user is authorized to use a specific property address
   */
  async verifyAddressAccess(
    userId: string, 
    userEmail: string,
    propertyAddress: string, 
    digitalAddress?: string, 
    propertyLicense?: string,
    attemptType: "address_update" | "registration" | "verification" = "address_update"
  ): Promise<AddressVerificationResult> {
    
    // Check if user is authorized for the property address
    const isAuthorizedByAddress = await storage.isUserAuthorizedForProperty(userId, propertyAddress);
    
    // Check digital address authorization if provided
    let isAuthorizedByDigital = true;
    if (digitalAddress) {
      isAuthorizedByDigital = await storage.isUserAuthorizedForDigitalAddress(userId, digitalAddress);
    }
    
    // Check property license authorization if provided
    let isAuthorizedByLicense = true;
    if (propertyLicense) {
      isAuthorizedByLicense = await storage.isUserAuthorizedForLicense(userId, propertyLicense);
    }
    
    const isFullyAuthorized = isAuthorizedByAddress && isAuthorizedByDigital && isAuthorizedByLicense;
    
    if (isFullyAuthorized) {
      return {
        isAuthorized: true,
        reason: "User is authorized to use this property address",
        requiresNotification: false
      };
    }
    
    // Find property owner for notification
    const property = await storage.getPropertyRegistrationByAddress(propertyAddress);
    let propertyOwnerId: string | undefined;
    
    if (property) {
      propertyOwnerId = property.ownerId;
    } else if (digitalAddress) {
      // Try to find by digital address
      const propertyByDigital = await this.findPropertyByDigitalAddress(digitalAddress);
      if (propertyByDigital) {
        propertyOwnerId = propertyByDigital.ownerId;
      }
    } else if (propertyLicense) {
      // Try to find by license
      const propertyByLicense = await storage.getPropertyRegistrationByLicense(propertyLicense);
      if (propertyByLicense) {
        propertyOwnerId = propertyByLicense.ownerId;
      }
    }
    
    // Log the failed attempt
    const attemptData: InsertAddressVerificationAttempt = {
      userId,
      userEmail,
      propertyAddress,
      digitalAddress,
      propertyLicense,
      propertyOwnerId,
      attemptType,
      status: "failed",
      notificationSent: false
    };
    
    await storage.createAddressVerificationAttempt(attemptData);
    
    // Check if property owner wants notifications
    let requiresNotification = false;
    if (propertyOwnerId) {
      const ownerPreferences = await storage.getNotificationPreferences(propertyOwnerId);
      requiresNotification = ownerPreferences?.addressAttemptNotifications ?? true;
      
      if (requiresNotification) {
        await this.sendNotificationToPropertyOwner(propertyOwnerId, userEmail, propertyAddress, attemptType);
      }
    }
    
    return {
      isAuthorized: false,
      reason: "User is not authorized to use this property address. Contact the property owner for access.",
      propertyOwnerId,
      requiresNotification
    };
  }
  
  /**
   * Find property by digital address
   */
  private async findPropertyByDigitalAddress(digitalAddress: string) {
    const allProperties = await storage.getAllPropertyRegistrations();
    return allProperties.find(p => p.digitalAddress === digitalAddress);
  }
  
  /**
   * Send notification to property owner about unauthorized access attempt
   */
  private async sendNotificationToPropertyOwner(
    ownerId: string, 
    attemptUserEmail: string, 
    propertyAddress: string, 
    attemptType: string
  ) {
    // Log notification attempt
    console.log(`Notification sent to property owner ${ownerId}: User ${attemptUserEmail} attempted ${attemptType} for property ${propertyAddress}`);
    
    // In a real implementation, this would send an email or push notification
    // For now, we'll just log it and update the database record
    
    // Update the verification attempt to mark notification as sent
    const attempts = await storage.getVerificationAttemptsByProperty(propertyAddress);
    const latestAttempt = attempts
      .filter(a => a.userEmail === attemptUserEmail)
      .sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime())[0];
    
    if (latestAttempt) {
      // In a real implementation, you'd update the record
      console.log(`Marked notification as sent for attempt ${latestAttempt.id}`);
    }
  }
  
  /**
   * Assign a user as tenant/inhabitant to a property
   */
  async assignUserToProperty(
    propertyId: number,
    tenantId: string,
    tenantEmail: string,
    tenantName: string,
    tenantType: "tenant" | "inhabitant" | "user",
    assignedBy: string
  ) {
    const tenantData = {
      propertyId,
      tenantId,
      tenantEmail,
      tenantName,
      tenantType,
      assignedBy,
      isActive: true
    };
    
    return await storage.createPropertyTenant(tenantData);
  }
  
  /**
   * Get all verification attempts for a property (for property owners)
   */
  async getPropertyVerificationAttempts(propertyAddress: string) {
    return await storage.getVerificationAttemptsByProperty(propertyAddress);
  }
}

export const addressVerificationService = new AddressVerificationService();