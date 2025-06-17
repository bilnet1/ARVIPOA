import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const propertyRegistrations = pgTable("property_registrations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  propertyType: text("property_type").notNull(), // Land, Building/House, Auto/bike/Aircraft/Marine, Electronic & Smart Devices, Livestock/Pets/Animal, Tree/Plant, Arms, Domain Name, Intellectual Property, PMB
  propertyAddress: text("property_address").notNull(),
  digitalAddress: text("digital_address"),
  pmbDetails: text("pmb_details"), // PMB number and details
  propertyValue: integer("property_value").notNull(),
  purchaseDate: text("purchase_date"),
  services: text("services").array().notNull(),
  urgency: text("urgency").notNull().default("standard"),
  additionalNotes: text("additional_notes"),
  referenceNumber: text("reference_number").notNull().unique(),
  propertyLicense: text("property_license").unique(),
  ownerId: text("owner_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const landRegistrations = pgTable("land_registrations", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => propertyRegistrations.id),
  landSize: text("land_size").notNull(), // in acres, hectares, or square meters
  landUnit: text("land_unit").notNull(), // acres, hectares, square_meters
  landUse: text("land_use").notNull(), // residential, commercial, agricultural, industrial
  landTitle: text("land_title"), // freehold, leasehold, customary
  titleNumber: text("title_number"),
  surveyPlan: text("survey_plan"),
  coordinates: text("coordinates"), // GPS coordinates
  boundary: text("boundary"), // boundary description
  soilType: text("soil_type"),
  topography: text("topography"), // flat, hilly, mountainous
  waterAccess: boolean("water_access").default(false),
  roadAccess: boolean("road_access").default(false),
  electricityAccess: boolean("electricity_access").default(false),
  nearestLandmark: text("nearest_landmark"),
  previousOwner: text("previous_owner"),
  acquisitionMethod: text("acquisition_method"), // purchase, inheritance, gift, allocation
  registrationStatus: text("registration_status").default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pmbRegistrations = pgTable("pmb_registrations", {
  id: serial("id").primaryKey(),
  pmbNumber: text("pmb_number").notNull().unique(),
  pmbProvider: text("pmb_provider").notNull(), // Company providing PMB service
  pmbAddress: text("pmb_address").notNull(),
  ownerId: text("owner_id").notNull(),
  ownerName: text("owner_name").notNull(),
  ownerEmail: text("owner_email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pmbUsers = pgTable("pmb_users", {
  id: serial("id").primaryKey(),
  pmbId: integer("pmb_id").notNull().references(() => pmbRegistrations.id),
  userId: text("user_id").notNull(),
  userEmail: text("user_email").notNull(),
  userName: text("user_name").notNull(),
  assignedBy: text("assigned_by").notNull(), // PMB owner ID
  assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export const propertyTenants = pgTable("property_tenants", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => propertyRegistrations.id),
  tenantId: text("tenant_id").notNull(),
  tenantEmail: text("tenant_email").notNull(),
  tenantName: text("tenant_name").notNull(),
  tenantType: text("tenant_type").notNull().default("tenant"), // tenant, inhabitant, user
  assignedBy: text("assigned_by").notNull(), // property owner ID
  assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export const addressVerificationAttempts = pgTable("address_verification_attempts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  userEmail: text("user_email").notNull(),
  propertyAddress: text("property_address").notNull(),
  digitalAddress: text("digital_address"),
  pmbDetails: text("pmb_details"),
  propertyLicense: text("property_license"),
  propertyOwnerId: text("property_owner_id"),
  attemptType: text("attempt_type").notNull(), // "address_update", "registration", "verification", "pmb_verification"
  status: text("status").notNull().default("failed"), // "failed", "pending", "approved"
  notificationSent: boolean("notification_sent").notNull().default(false),
  attemptedAt: timestamp("attempted_at").notNull().defaultNow(),
});

export const notificationPreferences = pgTable("notification_preferences", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  addressAttemptNotifications: boolean("address_attempt_notifications").notNull().default(true),
  tenantRequestNotifications: boolean("tenant_request_notifications").notNull().default(true),
  propertyUpdateNotifications: boolean("property_update_notifications").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Social Connections for Family, Friends, Neighbors, RBF Groups
export const socialConnections = pgTable("social_connections", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  connectedUserId: text("connected_user_id").notNull(),
  connectionType: text("connection_type").notNull(), // family, friend, neighbor, rbf_group
  relationshipLabel: text("relationship_label"), // brother, sister, colleague, etc.
  status: text("status").notNull().default("pending"), // pending, accepted, blocked
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Secure Wallet for documents, cards, keys, passwords
export const walletItems = pgTable("wallet_items", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  itemType: text("item_type").notNull(), // id_card, bank_card, certificate, license, crypto_key, password, pin, transcript
  title: text("title").notNull(),
  encryptedData: text("encrypted_data").notNull(), // Encrypted sensitive data
  metadata: text("metadata"), // Non-sensitive metadata (JSON string)
  category: text("category").notNull(), // personal, financial, educational, medical, legal
  tags: text("tags").array().default([]),
  isSecured: boolean("is_secured").notNull().default(true),
  biometricLocked: boolean("biometric_locked").notNull().default(true),
  lastAccessed: timestamp("last_accessed"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Medical Appointments with Google Calendar integration
export const medicalAppointments = pgTable("medical_appointments", {
  id: serial("id").primaryKey(),
  patientId: text("patient_id").notNull(),
  providerId: text("provider_id").notNull(), // Doctor/Hospital ID
  providerName: text("provider_name").notNull(),
  providerType: text("provider_type").notNull(), // doctor, hospital, pharmacy, clinic
  appointmentType: text("appointment_type").notNull(), // consultation, checkup, surgery, prescription
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").default(30), // minutes
  status: text("status").notNull().default("scheduled"), // scheduled, completed, cancelled, rescheduled
  notes: text("notes"),
  location: text("location"),
  digitalAddress: text("digital_address"),
  calendarEventId: text("calendar_event_id"), // Google Calendar Event ID
  reminderSent: boolean("reminder_sent").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Medical Records uploaded by practitioners
export const medicalRecords = pgTable("medical_records", {
  id: serial("id").primaryKey(),
  patientId: text("patient_id").notNull(),
  providerId: text("provider_id").notNull(),
  appointmentId: integer("appointment_id").references(() => medicalAppointments.id),
  recordType: text("record_type").notNull(), // prescription, test_result, diagnosis, treatment_plan
  title: text("title").notNull(),
  encryptedContent: text("encrypted_content").notNull(), // Encrypted medical data
  attachments: text("attachments").array().default([]), // File URLs
  confidentialityLevel: text("confidentiality_level").notNull().default("high"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Legal Cases and Court Cases
export const legalCases = pgTable("legal_cases", {
  id: serial("id").primaryKey(),
  clientId: text("client_id").notNull(),
  lawyerId: text("lawyer_id").notNull(),
  lawyerName: text("lawyer_name").notNull(),
  caseNumber: text("case_number").notNull().unique(),
  caseTitle: text("case_title").notNull(),
  caseType: text("case_type").notNull(), // civil, criminal, corporate, family, property
  courtName: text("court_name"),
  status: text("status").notNull().default("active"), // active, pending, closed, settled
  nextHearingDate: timestamp("next_hearing_date"),
  calendarEventId: text("calendar_event_id"), // Google Calendar Event ID
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Legal Appointments with lawyers and court hearings
export const legalAppointments = pgTable("legal_appointments", {
  id: serial("id").primaryKey(),
  clientId: text("client_id").notNull(),
  lawyerId: text("lawyer_id").notNull(),
  caseId: integer("case_id").references(() => legalCases.id),
  appointmentType: text("appointment_type").notNull(), // consultation, hearing, mediation, document_signing
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").default(60), // minutes
  location: text("location"),
  isCourtHearing: boolean("is_court_hearing").notNull().default(false),
  status: text("status").notNull().default("scheduled"),
  calendarEventId: text("calendar_event_id"), // Google Calendar Event ID
  reminderSent: boolean("reminder_sent").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Legal Documents and Case Updates from lawyers
export const legalDocuments = pgTable("legal_documents", {
  id: serial("id").primaryKey(),
  caseId: integer("case_id").notNull().references(() => legalCases.id),
  clientId: text("client_id").notNull(),
  lawyerId: text("lawyer_id").notNull(),
  documentType: text("document_type").notNull(), // contract, agreement, court_order, evidence, filing
  title: text("title").notNull(),
  encryptedContent: text("encrypted_content").notNull(),
  attachments: text("attachments").array().default([]),
  isConfidential: boolean("is_confidential").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertyRegistrationSchema = createInsertSchema(propertyRegistrations).omit({
  id: true,
  referenceNumber: true,
  createdAt: true,
}).extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  propertyType: z.enum([
    "Land", 
    "Building/House", 
    "Auto/bike/Aircraft/Marine", 
    "Electronic & Smart Devices", 
    "Livestock/Pets/Animal", 
    "Tree/Plant", 
    "Arms", 
    "Domain Name", 
    "Intellectual Property", 
    "PMB"
  ], { errorMap: () => ({ message: "Please select a valid property type" }) }),
  propertyAddress: z.string().min(10, "Please enter a complete property address"),
  digitalAddress: z.string().optional(),
  pmbDetails: z.string().optional(),
  propertyValue: z.number().min(1, "Property value must be greater than 0"),
  purchaseDate: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  urgency: z.enum(["standard", "expedited", "rush"]).default("standard"),
  additionalNotes: z.string().optional(),
  propertyLicense: z.string().optional(),
  ownerId: z.string().min(1, "Owner ID is required"),
});

export const insertPmbRegistrationSchema = createInsertSchema(pmbRegistrations).omit({
  id: true,
  createdAt: true,
}).extend({
  pmbNumber: z.string().min(1, "PMB number is required"),
  pmbProvider: z.string().min(1, "PMB provider is required"),
  pmbAddress: z.string().min(1, "PMB address is required"),
  ownerId: z.string().min(1, "Owner ID is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  ownerEmail: z.string().email("Please enter a valid email address"),
});

export const insertPmbUserSchema = createInsertSchema(pmbUsers).omit({
  id: true,
  assignedAt: true,
}).extend({
  pmbId: z.number().min(1, "PMB ID is required"),
  userId: z.string().min(1, "User ID is required"),
  userEmail: z.string().email("Please enter a valid email address"),
  userName: z.string().min(1, "User name is required"),
  assignedBy: z.string().min(1, "Assigner ID is required"),
  isActive: z.boolean().default(true),
});

export const insertLandRegistrationSchema = createInsertSchema(landRegistrations).omit({
  id: true,
  createdAt: true,
}).extend({
  propertyId: z.number().min(1, "Property ID is required"),
  landSize: z.string().min(1, "Land size is required"),
  landUnit: z.enum(["acres", "hectares", "square_meters"], { 
    errorMap: () => ({ message: "Please select a valid land unit" }) 
  }),
  landUse: z.enum(["residential", "commercial", "agricultural", "industrial", "mixed"], { 
    errorMap: () => ({ message: "Please select a valid land use" }) 
  }),
  landTitle: z.enum(["freehold", "leasehold", "customary", "statutory"], { 
    errorMap: () => ({ message: "Please select a valid land title type" }) 
  }).optional(),
  titleNumber: z.string().optional(),
  surveyPlan: z.string().optional(),
  coordinates: z.string().optional(),
  boundary: z.string().optional(),
  soilType: z.string().optional(),
  topography: z.enum(["flat", "hilly", "mountainous", "coastal", "valley"], { 
    errorMap: () => ({ message: "Please select a valid topography" }) 
  }).optional(),
  waterAccess: z.boolean().default(false),
  roadAccess: z.boolean().default(false),
  electricityAccess: z.boolean().default(false),
  nearestLandmark: z.string().optional(),
  previousOwner: z.string().optional(),
  acquisitionMethod: z.enum(["purchase", "inheritance", "gift", "allocation", "lease"], { 
    errorMap: () => ({ message: "Please select a valid acquisition method" }) 
  }).optional(),
  registrationStatus: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export const insertPropertyTenantSchema = createInsertSchema(propertyTenants).omit({
  id: true,
  assignedAt: true,
}).extend({
  propertyId: z.number().min(1, "Property ID is required"),
  tenantId: z.string().min(1, "Tenant ID is required"),
  tenantEmail: z.string().email("Please enter a valid email address"),
  tenantName: z.string().min(1, "Tenant name is required"),
  tenantType: z.enum(["tenant", "inhabitant", "user"]).default("tenant"),
  assignedBy: z.string().min(1, "Assigner ID is required"),
  isActive: z.boolean().default(true),
});

export const insertAddressVerificationAttemptSchema = createInsertSchema(addressVerificationAttempts).omit({
  id: true,
  attemptedAt: true,
}).extend({
  userId: z.string().min(1, "User ID is required"),
  userEmail: z.string().email("Please enter a valid email address"),
  propertyAddress: z.string().min(1, "Property address is required"),
  digitalAddress: z.string().optional(),
  pmbDetails: z.string().optional(),
  propertyLicense: z.string().optional(),
  propertyOwnerId: z.string().optional(),
  attemptType: z.enum(["address_update", "registration", "verification", "pmb_verification"]),
  status: z.enum(["failed", "pending", "approved"]).default("failed"),
  notificationSent: z.boolean().default(false),
});

export const insertNotificationPreferencesSchema = createInsertSchema(notificationPreferences).omit({
  id: true,
  createdAt: true,
}).extend({
  userId: z.string().min(1, "User ID is required"),
  addressAttemptNotifications: z.boolean().default(true),
  tenantRequestNotifications: z.boolean().default(true),
  propertyUpdateNotifications: z.boolean().default(true),
});

export const insertSocialConnectionSchema = createInsertSchema(socialConnections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  userId: z.string().min(1, "User ID is required"),
  connectedUserId: z.string().min(1, "Connected user ID is required"),
  connectionType: z.enum(["family", "friend", "neighbor", "rbf_group"]),
  relationshipLabel: z.string().optional(),
  status: z.enum(["pending", "accepted", "blocked"]).default("pending"),
});

export const insertWalletItemSchema = createInsertSchema(walletItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastAccessed: true,
}).extend({
  userId: z.string().min(1, "User ID is required"),
  itemType: z.enum(["id_card", "bank_card", "certificate", "license", "crypto_key", "password", "pin", "transcript"]),
  title: z.string().min(1, "Title is required"),
  encryptedData: z.string().min(1, "Data is required"),
  metadata: z.string().optional(),
  category: z.enum(["personal", "financial", "educational", "medical", "legal"]),
  tags: z.array(z.string()).default([]),
  isSecured: z.boolean().default(true),
  biometricLocked: z.boolean().default(true),
});

export const insertMedicalAppointmentSchema = createInsertSchema(medicalAppointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reminderSent: true,
}).extend({
  patientId: z.string().min(1, "Patient ID is required"),
  providerId: z.string().min(1, "Provider ID is required"),
  providerName: z.string().min(1, "Provider name is required"),
  providerType: z.enum(["doctor", "hospital", "pharmacy", "clinic"]),
  appointmentType: z.enum(["consultation", "checkup", "surgery", "prescription"]),
  appointmentDate: z.date(),
  duration: z.number().min(15).default(30),
  status: z.enum(["scheduled", "completed", "cancelled", "rescheduled"]).default("scheduled"),
  notes: z.string().optional(),
  location: z.string().optional(),
  digitalAddress: z.string().optional(),
  calendarEventId: z.string().optional(),
});

export const insertMedicalRecordSchema = createInsertSchema(medicalRecords).omit({
  id: true,
  createdAt: true,
}).extend({
  patientId: z.string().min(1, "Patient ID is required"),
  providerId: z.string().min(1, "Provider ID is required"),
  appointmentId: z.number().optional(),
  recordType: z.enum(["prescription", "test_result", "diagnosis", "treatment_plan"]),
  title: z.string().min(1, "Title is required"),
  encryptedContent: z.string().min(1, "Content is required"),
  attachments: z.array(z.string()).default([]),
  confidentialityLevel: z.enum(["low", "medium", "high"]).default("high"),
});

export const insertLegalCaseSchema = createInsertSchema(legalCases).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  clientId: z.string().min(1, "Client ID is required"),
  lawyerId: z.string().min(1, "Lawyer ID is required"),
  lawyerName: z.string().min(1, "Lawyer name is required"),
  caseNumber: z.string().min(1, "Case number is required"),
  caseTitle: z.string().min(1, "Case title is required"),
  caseType: z.enum(["civil", "criminal", "corporate", "family", "property"]),
  courtName: z.string().optional(),
  status: z.enum(["active", "pending", "closed", "settled"]).default("active"),
  nextHearingDate: z.date().optional(),
  calendarEventId: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
});

export const insertLegalAppointmentSchema = createInsertSchema(legalAppointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reminderSent: true,
}).extend({
  clientId: z.string().min(1, "Client ID is required"),
  lawyerId: z.string().min(1, "Lawyer ID is required"),
  caseId: z.number().optional(),
  appointmentType: z.enum(["consultation", "hearing", "mediation", "document_signing"]),
  appointmentDate: z.date(),
  duration: z.number().min(30).default(60),
  location: z.string().optional(),
  isCourtHearing: z.boolean().default(false),
  status: z.enum(["scheduled", "completed", "cancelled", "rescheduled"]).default("scheduled"),
  calendarEventId: z.string().optional(),
});

export const insertLegalDocumentSchema = createInsertSchema(legalDocuments).omit({
  id: true,
  createdAt: true,
}).extend({
  caseId: z.number().min(1, "Case ID is required"),
  clientId: z.string().min(1, "Client ID is required"),
  lawyerId: z.string().min(1, "Lawyer ID is required"),
  documentType: z.enum(["contract", "agreement", "court_order", "evidence", "filing"]),
  title: z.string().min(1, "Title is required"),
  encryptedContent: z.string().min(1, "Content is required"),
  attachments: z.array(z.string()).default([]),
  isConfidential: z.boolean().default(true),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPropertyRegistration = z.infer<typeof insertPropertyRegistrationSchema>;
export type PropertyRegistration = typeof propertyRegistrations.$inferSelect;
export type InsertLandRegistration = z.infer<typeof insertLandRegistrationSchema>;
export type LandRegistration = typeof landRegistrations.$inferSelect;
export type InsertPmbRegistration = z.infer<typeof insertPmbRegistrationSchema>;
export type PmbRegistration = typeof pmbRegistrations.$inferSelect;
export type InsertPmbUser = z.infer<typeof insertPmbUserSchema>;
export type PmbUser = typeof pmbUsers.$inferSelect;
export type InsertPropertyTenant = z.infer<typeof insertPropertyTenantSchema>;
export type PropertyTenant = typeof propertyTenants.$inferSelect;
export type InsertAddressVerificationAttempt = z.infer<typeof insertAddressVerificationAttemptSchema>;
export type AddressVerificationAttempt = typeof addressVerificationAttempts.$inferSelect;
export type InsertNotificationPreferences = z.infer<typeof insertNotificationPreferencesSchema>;
export type NotificationPreferences = typeof notificationPreferences.$inferSelect;

// New profile feature types
export type InsertSocialConnection = z.infer<typeof insertSocialConnectionSchema>;
export type SocialConnection = typeof socialConnections.$inferSelect;
export type InsertWalletItem = z.infer<typeof insertWalletItemSchema>;
export type WalletItem = typeof walletItems.$inferSelect;
export type InsertMedicalAppointment = z.infer<typeof insertMedicalAppointmentSchema>;
export type MedicalAppointment = typeof medicalAppointments.$inferSelect;
export type InsertMedicalRecord = z.infer<typeof insertMedicalRecordSchema>;
export type MedicalRecord = typeof medicalRecords.$inferSelect;
export type InsertLegalCase = z.infer<typeof insertLegalCaseSchema>;
export type LegalCase = typeof legalCases.$inferSelect;
export type InsertLegalAppointment = z.infer<typeof insertLegalAppointmentSchema>;
export type LegalAppointment = typeof legalAppointments.$inferSelect;
export type InsertLegalDocument = z.infer<typeof insertLegalDocumentSchema>;
export type LegalDocument = typeof legalDocuments.$inferSelect;

// Organization Management Tables
export const organizations = pgTable("organizations", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  companyCategory: text("company_category").notNull(), // Government, Private, Public, NGO, Freelancer, Entrepreneur
  companyActivities: text("company_activities").array().notNull(),
  companyEmail: text("company_email").notNull().unique(),
  companyWebsite: text("company_website"),
  companyPhone: text("company_phone").notNull(),
  companyRegNo: text("company_reg_no").notNull().unique(),
  companyType: text("company_type").notNull(),
  tin: text("tin").notNull(),
  workingDays: text("working_days").array().notNull(),
  workingHours: text("working_hours").notNull(),
  certificateType: text("certificate_type"),
  certificateIssuer: text("certificate_issuer"),
  certificatePlaceOfIssue: text("certificate_place_of_issue"),
  ownerId: text("owner_id").notNull(),
  companyIdNumber: text("company_id_number").notNull().unique(),
  deliveryMethod: text("delivery_method").notNull(), // Office, Delivery, Pickup
  isNew: boolean("is_new").default(true), // NEW or EXISTING registration
  emailVerified: boolean("email_verified").default(false),
  phoneVerified: boolean("phone_verified").default(false),
  urlVerified: boolean("url_verified").default(false),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const organizationRepresentatives = pgTable("organization_representatives", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").notNull().references(() => organizations.id),
  userId: text("user_id").notNull(),
  idNumber: text("id_number").notNull(),
  position: text("position").notNull(), // Director, Secretary, Manager, etc.
  allocatedShares: text("allocated_shares").default("None"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  isPrimary: boolean("is_primary").default(false),
  isVerified: boolean("is_verified").default(false),
  invitationSent: boolean("invitation_sent").default(false),
  otpCode: text("otp_code"),
  otpExpiry: timestamp("otp_expiry"),
  joinedAt: timestamp("joined_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const organizationStaff = pgTable("organization_staff", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").notNull().references(() => organizations.id),
  workerId: text("worker_id").notNull(),
  workerCategory: text("worker_category").notNull(), // Individual, Organization
  position: text("position").notNull(),
  workIdNumber: text("work_id_number").notNull(),
  allocatedShares: text("allocated_shares").default("None"),
  workType: text("work_type").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isActive: boolean("is_active").default(true),
  isVerified: boolean("is_verified").default(false),
  invitationSent: boolean("invitation_sent").default(false),
  otpCode: text("otp_code"),
  otpExpiry: timestamp("otp_expiry"),
  joinedAt: timestamp("joined_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const organizationProducts = pgTable("organization_products", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").notNull().references(() => organizations.id),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  currency: text("currency").notNull(), // GHS, USD, GBP, EURO, Others
  customCurrency: text("custom_currency"), // For "Others" option
  attachedFiles: text("attached_files").array(),
  bannerDesign: text("banner_design"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const organizationActivities = pgTable("organization_activities", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").notNull().references(() => organizations.id),
  workerId: text("worker_id").notNull(),
  activityDate: text("activity_date").notNull(),
  timeFrom: text("time_from").notNull(),
  timeTo: text("time_to").notNull(),
  status: text("status").notNull(), // Active, Off-duty, Leave
  activityDetails: text("activity_details").notNull(),
  proofAttachment: text("proof_attachment"),
  isOvertime: boolean("is_overtime").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const organizationRoster = pgTable("organization_roster", {
  id: serial("id").primaryKey(),
  organizationId: integer("organization_id").notNull().references(() => organizations.id),
  workerId: text("worker_id").notNull(),
  scheduledDate: text("scheduled_date").notNull(),
  scheduledTimeFrom: text("scheduled_time_from").notNull(),
  scheduledTimeTo: text("scheduled_time_to").notNull(),
  reminderSent: boolean("reminder_sent").default(false),
  smsReminder: boolean("sms_reminder").default(false),
  inAppReminder: boolean("in_app_reminder").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Organization Schema Validations
export const insertOrganizationSchema = createInsertSchema(organizations).omit({
  id: true,
  companyIdNumber: true,
  emailVerified: true,
  phoneVerified: true,
  urlVerified: true,
  isVerified: true,
  createdAt: true,
}).extend({
  companyName: z.string().min(1, "Company name is required"),
  companyCategory: z.enum(["Government", "Private", "Public", "NGO", "Freelancer", "Entrepreneur"]),
  companyActivities: z.array(z.string()).min(1, "At least one activity is required"),
  companyEmail: z.string().email("Please enter a valid email address"),
  companyWebsite: z.string().url("Please enter a valid website URL").optional(),
  companyPhone: z.string().min(10, "Please enter a valid phone number"),
  companyRegNo: z.string().min(1, "Company registration number is required"),
  companyType: z.string().min(1, "Company type is required"),
  tin: z.string().min(1, "TIN is required"),
  workingDays: z.array(z.string()).min(1, "At least one working day is required"),
  workingHours: z.string().min(1, "Working hours are required"),
  deliveryMethod: z.enum(["Office", "Delivery", "Pickup"]),
  ownerId: z.string().min(1, "Owner ID is required"),
});

export const insertOrganizationRepresentativeSchema = createInsertSchema(organizationRepresentatives).omit({
  id: true,
  isVerified: true,
  invitationSent: true,
  otpCode: true,
  otpExpiry: true,
  joinedAt: true,
  createdAt: true,
}).extend({
  organizationId: z.number().min(1, "Organization ID is required"),
  userId: z.string().min(1, "User ID is required"),
  idNumber: z.string().min(1, "ID number is required"),
  position: z.string().min(1, "Position is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
});

export const insertOrganizationStaffSchema = createInsertSchema(organizationStaff).omit({
  id: true,
  isActive: true,
  isVerified: true,
  invitationSent: true,
  otpCode: true,
  otpExpiry: true,
  joinedAt: true,
  createdAt: true,
}).extend({
  organizationId: z.number().min(1, "Organization ID is required"),
  workerId: z.string().min(1, "Worker ID is required"),
  workerCategory: z.enum(["Individual", "Organization"]),
  position: z.string().min(1, "Position is required"),
  workIdNumber: z.string().min(1, "Work ID number is required"),
  workType: z.string().min(1, "Work type is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  startDate: z.string().min(1, "Start date is required"),
});

export const insertOrganizationProductSchema = createInsertSchema(organizationProducts).omit({
  id: true,
  isActive: true,
  createdAt: true,
}).extend({
  organizationId: z.number().min(1, "Organization ID is required"),
  category: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Product/Service name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  currency: z.enum(["GHS", "USD", "GBP", "EURO", "Others"]),
});

export const insertOrganizationActivitySchema = createInsertSchema(organizationActivities).omit({
  id: true,
  createdAt: true,
}).extend({
  organizationId: z.number().min(1, "Organization ID is required"),
  workerId: z.string().min(1, "Worker ID is required"),
  activityDate: z.string().min(1, "Activity date is required"),
  timeFrom: z.string().min(1, "Start time is required"),
  timeTo: z.string().min(1, "End time is required"),
  status: z.enum(["Active", "Off-duty", "Leave"]),
  activityDetails: z.string().min(1, "Activity details are required"),
});

export const insertOrganizationRosterSchema = createInsertSchema(organizationRoster).omit({
  id: true,
  reminderSent: true,
  smsReminder: true,
  inAppReminder: true,
  createdAt: true,
}).extend({
  organizationId: z.number().min(1, "Organization ID is required"),
  workerId: z.string().min(1, "Worker ID is required"),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
  scheduledTimeFrom: z.string().min(1, "Start time is required"),
  scheduledTimeTo: z.string().min(1, "End time is required"),
});

// Organization Types
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
export type Organization = typeof organizations.$inferSelect;
export type InsertOrganizationRepresentative = z.infer<typeof insertOrganizationRepresentativeSchema>;
export type OrganizationRepresentative = typeof organizationRepresentatives.$inferSelect;
export type InsertOrganizationStaff = z.infer<typeof insertOrganizationStaffSchema>;
export type OrganizationStaff = typeof organizationStaff.$inferSelect;
export type InsertOrganizationProduct = z.infer<typeof insertOrganizationProductSchema>;
export type OrganizationProduct = typeof organizationProducts.$inferSelect;
export type InsertOrganizationActivity = z.infer<typeof insertOrganizationActivitySchema>;
export type OrganizationActivity = typeof organizationActivities.$inferSelect;
export type InsertOrganizationRoster = z.infer<typeof insertOrganizationRosterSchema>;
export type OrganizationRoster = typeof organizationRoster.$inferSelect;
