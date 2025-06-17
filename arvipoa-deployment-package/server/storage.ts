import { 
  users, 
  propertyRegistrations,
  landRegistrations, 
  propertyTenants,
  addressVerificationAttempts,
  notificationPreferences,
  pmbRegistrations,
  pmbUsers,
  type User, 
  type InsertUser, 
  type PropertyRegistration, 
  type InsertPropertyRegistration,
  type LandRegistration,
  type InsertLandRegistration,
  type PropertyTenant,
  type InsertPropertyTenant,
  type AddressVerificationAttempt,
  type InsertAddressVerificationAttempt,
  type NotificationPreferences,
  type InsertNotificationPreferences,
  type PmbRegistration,
  type InsertPmbRegistration,
  type PmbUser,
  type InsertPmbUser,
  type Organization,
  type InsertOrganization,
  type OrganizationRepresentative,
  type InsertOrganizationRepresentative,
  type OrganizationStaff,
  type InsertOrganizationStaff,
  type OrganizationProduct,
  type InsertOrganizationProduct,
  type OrganizationActivity,
  type InsertOrganizationActivity,
  type OrganizationRoster,
  type InsertOrganizationRoster
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createPropertyRegistration(registration: InsertPropertyRegistration): Promise<PropertyRegistration>;
  getPropertyRegistration(id: number): Promise<PropertyRegistration | undefined>;
  getPropertyRegistrationByReference(referenceNumber: string): Promise<PropertyRegistration | undefined>;
  getPropertyRegistrationByAddress(address: string): Promise<PropertyRegistration | undefined>;
  getPropertyRegistrationByLicense(license: string): Promise<PropertyRegistration | undefined>;
  getAllPropertyRegistrations(): Promise<PropertyRegistration[]>;
  
  // Land registration management
  createLandRegistration(landRegistration: InsertLandRegistration): Promise<LandRegistration>;
  getLandRegistration(id: number): Promise<LandRegistration | undefined>;
  getLandRegistrationByPropertyId(propertyId: number): Promise<LandRegistration | undefined>;
  getAllLandRegistrations(): Promise<LandRegistration[]>;
  
  // Property tenant management
  createPropertyTenant(tenant: InsertPropertyTenant): Promise<PropertyTenant>;
  getPropertyTenants(propertyId: number): Promise<PropertyTenant[]>;
  isUserAuthorizedForProperty(userId: string, propertyAddress: string): Promise<boolean>;
  isUserAuthorizedForDigitalAddress(userId: string, digitalAddress: string): Promise<boolean>;
  isUserAuthorizedForLicense(userId: string, license: string): Promise<boolean>;
  
  // Address verification attempts
  createAddressVerificationAttempt(attempt: InsertAddressVerificationAttempt): Promise<AddressVerificationAttempt>;
  getVerificationAttemptsByProperty(propertyAddress: string): Promise<AddressVerificationAttempt[]>;
  
  // Notification preferences
  createNotificationPreferences(preferences: InsertNotificationPreferences): Promise<NotificationPreferences>;
  getNotificationPreferences(userId: string): Promise<NotificationPreferences | undefined>;
  updateNotificationPreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences>;
  
  // PMB management
  createPmbRegistration(pmb: InsertPmbRegistration): Promise<PmbRegistration>;
  getPmbRegistration(pmbNumber: string): Promise<PmbRegistration | undefined>;
  createPmbUser(pmbUser: InsertPmbUser): Promise<PmbUser>;
  getPmbUsers(pmbId: number): Promise<PmbUser[]>;
  isUserAuthorizedForPmb(userId: string, pmbDetails: string): Promise<boolean>;
  
  // Organization management
  createOrganization(organization: InsertOrganization): Promise<Organization>;
  getOrganization(id: number): Promise<Organization | undefined>;
  getOrganizationByOwnerId(ownerId: string): Promise<Organization[]>;
  getOrganizationByEmail(email: string): Promise<Organization | undefined>;
  updateOrganization(id: number, updates: Partial<Organization>): Promise<Organization>;
  
  // Organization representatives
  createOrganizationRepresentative(rep: InsertOrganizationRepresentative): Promise<OrganizationRepresentative>;
  getOrganizationRepresentatives(organizationId: number): Promise<OrganizationRepresentative[]>;
  updateOrganizationRepresentative(id: number, updates: Partial<OrganizationRepresentative>): Promise<OrganizationRepresentative>;
  
  // Organization staff
  createOrganizationStaff(staff: InsertOrganizationStaff): Promise<OrganizationStaff>;
  getOrganizationStaff(organizationId: number): Promise<OrganizationStaff[]>;
  updateOrganizationStaff(id: number, updates: Partial<OrganizationStaff>): Promise<OrganizationStaff>;
  
  // Organization products
  createOrganizationProduct(product: InsertOrganizationProduct): Promise<OrganizationProduct>;
  getOrganizationProducts(organizationId: number): Promise<OrganizationProduct[]>;
  updateOrganizationProduct(id: number, updates: Partial<OrganizationProduct>): Promise<OrganizationProduct>;
  
  // Organization activities
  createOrganizationActivity(activity: InsertOrganizationActivity): Promise<OrganizationActivity>;
  getOrganizationActivities(organizationId: number): Promise<OrganizationActivity[]>;
  getWorkerActivities(workerId: string): Promise<OrganizationActivity[]>;
  
  // Organization roster
  createOrganizationRoster(roster: InsertOrganizationRoster): Promise<OrganizationRoster>;
  getOrganizationRoster(organizationId: number): Promise<OrganizationRoster[]>;
  getWorkerRoster(workerId: string): Promise<OrganizationRoster[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private propertyRegistrations: Map<number, PropertyRegistration>;
  private landRegistrations: Map<number, LandRegistration>;
  private propertyTenants: Map<number, PropertyTenant>;
  private addressVerificationAttempts: Map<number, AddressVerificationAttempt>;
  private notificationPreferences: Map<string, NotificationPreferences>;
  private pmbRegistrations: Map<string, PmbRegistration>;
  private pmbUsers: Map<number, PmbUser>;
  private currentUserId: number;
  private currentRegistrationId: number;
  private currentLandRegistrationId: number;
  private currentTenantId: number;
  private currentAttemptId: number;
  private currentPmbUserId: number;

  constructor() {
    this.users = new Map();
    this.propertyRegistrations = new Map();
    this.landRegistrations = new Map();
    this.propertyTenants = new Map();
    this.addressVerificationAttempts = new Map();
    this.notificationPreferences = new Map();
    this.pmbRegistrations = new Map();
    this.pmbUsers = new Map();
    this.currentUserId = 1;
    this.currentRegistrationId = 1;
    this.currentLandRegistrationId = 1;
    this.currentTenantId = 1;
    this.currentAttemptId = 1;
    this.currentPmbUserId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPropertyRegistration(insertRegistration: InsertPropertyRegistration): Promise<PropertyRegistration> {
    const id = this.currentRegistrationId++;
    const referenceNumber = `PR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
    const registration: PropertyRegistration = {
      id,
      firstName: insertRegistration.firstName,
      lastName: insertRegistration.lastName,
      email: insertRegistration.email,
      phone: insertRegistration.phone,
      propertyType: insertRegistration.propertyType,
      propertyAddress: insertRegistration.propertyAddress,
      digitalAddress: insertRegistration.digitalAddress || null,
      pmbDetails: insertRegistration.pmbDetails || null,
      propertyValue: insertRegistration.propertyValue,
      purchaseDate: insertRegistration.purchaseDate || null,
      services: insertRegistration.services,
      urgency: insertRegistration.urgency,
      additionalNotes: insertRegistration.additionalNotes || null,
      referenceNumber,
      propertyLicense: insertRegistration.propertyLicense || null,
      ownerId: insertRegistration.ownerId,
      createdAt: new Date(),
    };
    this.propertyRegistrations.set(id, registration);
    return registration;
  }

  async getPropertyRegistration(id: number): Promise<PropertyRegistration | undefined> {
    return this.propertyRegistrations.get(id);
  }

  async getPropertyRegistrationByReference(referenceNumber: string): Promise<PropertyRegistration | undefined> {
    return Array.from(this.propertyRegistrations.values()).find(
      (registration) => registration.referenceNumber === referenceNumber,
    );
  }

  async getPropertyRegistrationByAddress(address: string): Promise<PropertyRegistration | undefined> {
    return Array.from(this.propertyRegistrations.values()).find(
      (reg) => reg.propertyAddress === address
    );
  }

  async getPropertyRegistrationByLicense(license: string): Promise<PropertyRegistration | undefined> {
    return Array.from(this.propertyRegistrations.values()).find(
      (reg) => reg.propertyLicense === license
    );
  }

  async getAllPropertyRegistrations(): Promise<PropertyRegistration[]> {
    return Array.from(this.propertyRegistrations.values());
  }

  // Land registration management
  async createLandRegistration(insertLandRegistration: InsertLandRegistration): Promise<LandRegistration> {
    const id = this.currentLandRegistrationId++;
    const landRegistration: LandRegistration = {
      id,
      propertyId: insertLandRegistration.propertyId,
      landSize: insertLandRegistration.landSize,
      landUnit: insertLandRegistration.landUnit,
      landUse: insertLandRegistration.landUse,
      landTitle: insertLandRegistration.landTitle || null,
      titleNumber: insertLandRegistration.titleNumber || null,
      surveyPlan: insertLandRegistration.surveyPlan || null,
      coordinates: insertLandRegistration.coordinates || null,
      boundary: insertLandRegistration.boundary || null,
      soilType: insertLandRegistration.soilType || null,
      topography: insertLandRegistration.topography || null,
      waterAccess: insertLandRegistration.waterAccess,
      roadAccess: insertLandRegistration.roadAccess,
      electricityAccess: insertLandRegistration.electricityAccess,
      nearestLandmark: insertLandRegistration.nearestLandmark || null,
      previousOwner: insertLandRegistration.previousOwner || null,
      acquisitionMethod: insertLandRegistration.acquisitionMethod || null,
      registrationStatus: insertLandRegistration.registrationStatus || "pending",
      createdAt: new Date(),
    };
    this.landRegistrations.set(id, landRegistration);
    return landRegistration;
  }

  async getLandRegistration(id: number): Promise<LandRegistration | undefined> {
    return this.landRegistrations.get(id);
  }

  async getLandRegistrationByPropertyId(propertyId: number): Promise<LandRegistration | undefined> {
    return Array.from(this.landRegistrations.values()).find(
      (land) => land.propertyId === propertyId
    );
  }

  async getAllLandRegistrations(): Promise<LandRegistration[]> {
    return Array.from(this.landRegistrations.values());
  }

  // Property tenant management
  async createPropertyTenant(insertTenant: InsertPropertyTenant): Promise<PropertyTenant> {
    const id = this.currentTenantId++;
    const tenant: PropertyTenant = {
      id,
      propertyId: insertTenant.propertyId,
      tenantId: insertTenant.tenantId,
      tenantEmail: insertTenant.tenantEmail,
      tenantName: insertTenant.tenantName,
      tenantType: insertTenant.tenantType,
      assignedBy: insertTenant.assignedBy,
      assignedAt: new Date(),
      isActive: insertTenant.isActive,
    };
    this.propertyTenants.set(id, tenant);
    return tenant;
  }

  async getPropertyTenants(propertyId: number): Promise<PropertyTenant[]> {
    return Array.from(this.propertyTenants.values()).filter(
      (tenant) => tenant.propertyId === propertyId && tenant.isActive
    );
  }

  async isUserAuthorizedForProperty(userId: string, propertyAddress: string): Promise<boolean> {
    const property = await this.getPropertyRegistrationByAddress(propertyAddress);
    if (!property) return false;
    
    // Check if user is the owner
    if (property.ownerId === userId) return true;
    
    // Check if user is assigned as tenant/inhabitant
    const tenants = await this.getPropertyTenants(property.id);
    return tenants.some(tenant => tenant.tenantId === userId && tenant.isActive);
  }

  async isUserAuthorizedForDigitalAddress(userId: string, digitalAddress: string): Promise<boolean> {
    const property = Array.from(this.propertyRegistrations.values()).find(
      (reg) => reg.digitalAddress === digitalAddress
    );
    if (!property) return false;
    
    // Check if user is the owner
    if (property.ownerId === userId) return true;
    
    // Check if user is assigned as tenant/inhabitant
    const tenants = await this.getPropertyTenants(property.id);
    return tenants.some(tenant => tenant.tenantId === userId && tenant.isActive);
  }

  async isUserAuthorizedForLicense(userId: string, license: string): Promise<boolean> {
    const property = await this.getPropertyRegistrationByLicense(license);
    if (!property) return false;
    
    // Check if user is the owner
    if (property.ownerId === userId) return true;
    
    // Check if user is assigned as tenant/inhabitant
    const tenants = await this.getPropertyTenants(property.id);
    return tenants.some(tenant => tenant.tenantId === userId && tenant.isActive);
  }

  // Address verification attempts
  async createAddressVerificationAttempt(insertAttempt: InsertAddressVerificationAttempt): Promise<AddressVerificationAttempt> {
    const id = this.currentAttemptId++;
    const attempt: AddressVerificationAttempt = {
      id,
      userId: insertAttempt.userId,
      userEmail: insertAttempt.userEmail,
      propertyAddress: insertAttempt.propertyAddress,
      digitalAddress: insertAttempt.digitalAddress || null,
      pmbDetails: insertAttempt.pmbDetails || null,
      propertyLicense: insertAttempt.propertyLicense || null,
      propertyOwnerId: insertAttempt.propertyOwnerId || null,
      attemptType: insertAttempt.attemptType,
      status: insertAttempt.status,
      notificationSent: insertAttempt.notificationSent,
      attemptedAt: new Date(),
    };
    this.addressVerificationAttempts.set(id, attempt);
    return attempt;
  }

  async getVerificationAttemptsByProperty(propertyAddress: string): Promise<AddressVerificationAttempt[]> {
    return Array.from(this.addressVerificationAttempts.values()).filter(
      (attempt) => attempt.propertyAddress === propertyAddress
    );
  }

  // Notification preferences
  async createNotificationPreferences(insertPreferences: InsertNotificationPreferences): Promise<NotificationPreferences> {
    const preferences: NotificationPreferences = {
      id: Math.floor(Math.random() * 999999),
      userId: insertPreferences.userId,
      addressAttemptNotifications: insertPreferences.addressAttemptNotifications,
      tenantRequestNotifications: insertPreferences.tenantRequestNotifications,
      propertyUpdateNotifications: insertPreferences.propertyUpdateNotifications,
      createdAt: new Date(),
    };
    this.notificationPreferences.set(insertPreferences.userId, preferences);
    return preferences;
  }

  async getNotificationPreferences(userId: string): Promise<NotificationPreferences | undefined> {
    return this.notificationPreferences.get(userId);
  }

  async updateNotificationPreferences(userId: string, updates: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const existing = this.notificationPreferences.get(userId);
    if (!existing) {
      throw new Error("Notification preferences not found");
    }
    const updated = { ...existing, ...updates };
    this.notificationPreferences.set(userId, updated);
    return updated;
  }

  // PMB management methods
  async createPmbRegistration(insertPmb: InsertPmbRegistration): Promise<PmbRegistration> {
    const pmb: PmbRegistration = {
      id: Math.floor(Math.random() * 999999),
      pmbNumber: insertPmb.pmbNumber,
      pmbProvider: insertPmb.pmbProvider,
      pmbAddress: insertPmb.pmbAddress,
      ownerId: insertPmb.ownerId,
      ownerName: insertPmb.ownerName,
      ownerEmail: insertPmb.ownerEmail,
      createdAt: new Date(),
    };
    this.pmbRegistrations.set(insertPmb.pmbNumber, pmb);
    return pmb;
  }

  async getPmbRegistration(pmbNumber: string): Promise<PmbRegistration | undefined> {
    return this.pmbRegistrations.get(pmbNumber);
  }

  async createPmbUser(insertPmbUser: InsertPmbUser): Promise<PmbUser> {
    const id = this.currentPmbUserId++;
    const pmbUser: PmbUser = {
      id,
      pmbId: insertPmbUser.pmbId,
      userId: insertPmbUser.userId,
      userEmail: insertPmbUser.userEmail,
      userName: insertPmbUser.userName,
      assignedBy: insertPmbUser.assignedBy,
      assignedAt: new Date(),
      isActive: insertPmbUser.isActive,
    };
    this.pmbUsers.set(id, pmbUser);
    return pmbUser;
  }

  async getPmbUsers(pmbId: number): Promise<PmbUser[]> {
    return Array.from(this.pmbUsers.values()).filter(
      (pmbUser) => pmbUser.pmbId === pmbId && pmbUser.isActive
    );
  }

  async isUserAuthorizedForPmb(userId: string, pmbDetails: string): Promise<boolean> {
    // Extract PMB number from details (assuming format like "PMB 1234" or just "1234")
    const pmbNumber = pmbDetails.replace(/^PMB\s*/i, '').trim();
    
    const pmb = await this.getPmbRegistration(pmbNumber);
    if (!pmb) return false;
    
    // Check if user is the PMB owner
    if (pmb.ownerId === userId) return true;
    
    // Check if user is assigned to use this PMB
    const pmbUsers = await this.getPmbUsers(pmb.id);
    return pmbUsers.some(pmbUser => pmbUser.userId === userId && pmbUser.isActive);
  }
}

export const storage = new MemStorage();
