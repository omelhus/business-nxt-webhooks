import { z } from "zod";

/* Sample payload
{
   "tableIdentifier":"Product",
   "customerNo":0,
   "companyNo":0,
   "primaryKeys":[
      {
         "ProductNo":"1001"
      }
   ],
   "event":"UPDATE",
   "timestamp":"2024-05-27T18:12:55.7720784Z"
}
*/

const BusinessModelTables = z.enum([
  "Associate",
  "DeliveryAddress",
  "BankAccount",
  "Proxy",
  "AssociateReference",
  "AssociateInformation",
  "Address",
  "InformationType",
  "InformationNeed",
  "Source",
  "OpenCustomerEntry",
  "CustomerTransaction",
  "MatchedCustomerTransaction",
  "CustomerBalance",
  "CustomerDocument",
  "CustomerDocumentLine",
  "CustomerDocumentFormula",
  "OpenSupplierEntry",
  "SupplierTransaction",
  "MatchedSupplierTransaction",
  "SupplierBalance",
  "BankPartner",
  "Payment",
  "PaymentLine",
  "RetailJobDistribution",
  "RetailQueueChange",
  "RetailFromMessage",
  "RetailToMessage",
  "RetailReportLabel",
  "RetailVoucher",
  "RetailVoucherLine",
  "GeneralLedgerAccount",
  "AutomaticEntry",
  "GeneralLedgerTransaction",
  "GeneralLedgerBalance",
  "GeneralLedgerPeriodBalance",
  "GeneralLedgerBalanceForOrgUnit1",
  "GeneralLedgerBalanceForOrgUnit2",
  "GeneralLedgerBalanceForOrgUnit3",
  "GeneralLedgerBalanceForOrgUnit4",
  "GeneralLedgerBalanceForOrgUnit5",
  "GeneralLedgerBalanceForOrgUnit6",
  "GeneralLedgerBalanceForOrgUnit7",
  "GeneralLedgerBalanceForOrgUnit8",
  "GeneralLedgerBalanceForOrgUnit9",
  "GeneralLedgerBalanceForOrgUnit10",
  "GeneralLedgerBalanceForOrgUnit11",
  "GeneralLedgerBalanceForOrgUnit12",
  "AccountGroup",
  "ProfitAndLossAccountAndBalanceSheetDefinition",
  "ProfitAndLossAccountAndBalanceSheetDefinitionLine",
  "ProfitAndLossAccountAndBalanceSheetColumn",
  "ReportNote",
  "AccountStatementTransaction",
  "AccountStatementDetail",
  "BankReconciliationStatementColumn",
  "ApprovedReconciliation",
  "ReconciledTransaction",
  "CapitalAssetGroup",
  "CapitalAssetClass",
  "CapitalAsset",
  "CapitalAssetTransaction",
  "CapitalAssetBalance",
  "AllAccounts",
  "AccountingTransaction",
  "Appointment",
  "AppointmentAccess",
  "AppointmentStructure",
  "Holiday",
  "Resource",
  "ResourceReservation",
  "TimeScheduleGroup",
  "TimeScheduleCalendar",
  "TimeScheduleBalance",
  "Program",
  "Path",
  "Template",
  "ExternalConfiguration",
  "TemplateType",
  "TemplateAccess",
  "Document",
  "DocumentLink",
  "DocumentCount",
  "ScanDocument",
  "ScanDocumentData",
  "ProcessedDocumentFlow",
  "ProcessedDocumentFlowData",
  "DocumentComment",
  "FlowType",
  "FlowGroup",
  "FlowGroupMember",
  "OrgUnit1",
  "OrgUnit2",
  "OrgUnit3",
  "OrgUnit4",
  "OrgUnit5",
  "OrgUnit6",
  "OrgUnit7",
  "OrgUnit8",
  "OrgUnit9",
  "OrgUnit10",
  "OrgUnit11",
  "OrgUnit12",
  "ResponseType",
  "CampaignResponse",
  "Participant",
  "DistributionKey",
  "DistributionLine",
  "Product",
  "ProductProcessingMethod",
  "SearchProduct",
  "Structure",
  "DeliveryAlternative",
  "Barcode",
  "Unit",
  "PriceAndDiscountMatrix",
  "PriceRefund",
  "PriceFactor",
  "ProductCategory",
  "ProductDescription",
  "AlternativeProduct",
  "ProductCustomer",
  "TaxAndAccountingGroup",
  "TaxAndAccountingInformation",
  "Warehouse",
  "Location",
  "ItemLocation",
  "ItemLocationBalance",
  "LocationBalance",
  "StockBalance",
  "StockChange",
  "AggregatedShipment",
  "Shipment",
  "Order",
  "OrderNote",
  "IncomingTracking",
  "OrderLine",
  "OrderLineAddition",
  "OrderLineNote",
  "Reservation",
  "PickList",
  "SerialNo",
  "PurchaseSuggestion",
  "PurchaseSuggestionLine",
  "OrderJournal",
  "RealisationJournal",
  "RealisationJournalLine",
  "ProductTransaction",
  "ProductTransaction2",
  "OrderDocument",
  "OrderDocumentNote",
  "OutgoingTracking",
  "OrderDocumentLine",
  "OrderDocumentLineAddition",
  "OrderDocumentLineNote",
  "OrderDocumentFormula",
  "OrderDocumentDeliveryLog",
  "ImportDocumentBasis",
  "ImportBasis",
  "ImportLineBasis",
  "Budget",
  "BudgetLine",
  "Batch",
  "Voucher",
  "CrossReference",
  "UpdateJournal",
  "UpdatedBatch",
  "UpdatedVoucher",
  "UpdatedCrossReference",
  "TaskJournal",
  "CompanyInformation",
  "PostalAddress",
  "Country",
  "InterestRate",
  "Reminder",
  "Language",
  "Text",
  "Currency",
  "ExchangeRate",
  "ExchangeRate2",
  "Bank",
  "PaymentTerms",
  "PaymentMethod",
  "TransportAgreement",
  "TransportZone",
  "FactoringCompany",
  "VoucherType",
  "EdiMessage",
  "EdiErrorMessage",
  "StatisticsPeriod",
  "AccountingPeriod",
  "TaxTermRemark",
  "TaxTerm",
  "OssTaxTerm",
  "VatCodeRemark",
  "VatCodeExplanation",
  "PeriodKey",
  "PeriodLine",
  "EmailTemplate",
  "DocumentDeliveryEmail",
  "TaxCode",
  "Vat",
  "InvestmentTax",
  "VoucherSeries",
  "UnusedOrReservedNo",
  "AccountNoSeries",
  "FormChoice",
  "IntegerCompanyVariable",
  "DecimalCompanyVariable",
  "StringCompanyVariable",
  "FreeInformation1",
  "FreeInformation2",
  "FreeInformation3",
  "LimitationGroup",
  "UserLimitationGroup",
  "Limitation",
  "CombinationGroup",
  "UserCombinationGroup",
  "CombinationMatrix",
  "CurrencyCorrection",
  "CurrencyCorrectionData",
  "InterestLine",
  "EdocumentLog",
  "EdocumentInformation",
  "EdiFormatId",
  "AutoInvoiceOperator",
  "Altinn",
  "AltinnLog",
  "CustomerDocumentLog",
  "TaxCodeAutomaticEntry",
  "TaxStatementLog",
  "OssTaxStatementLog",
  "EdiTransactionLog",
  "CompanyChangeLog",
  "NotificationCode",
  "TextCode",
  "DeclarationCode",
  "PaymentAgreement",
  "CompanyIndex",
  "CompanyMetaInformation",
  "ActiveCompanyProcess",
  "CompanyError",
  "CompanyMaster",
  "OrderAttachment",
  "OrderDocumentAttachment",
  "EmailConfigurationCompany",
  "AssociateSocialMedia",
  "SyncEngineMetaInformation",
  "AutoreportArchive",
  "AccountOfficeProductInformation",
  "AutopayLog",
  "AutopayVipPaymentLine",
  "AutopayVipTextInfo",
  "SyncEngineControlInformation",
  "IncomingDocument",
  "IncomingDocumentChange",
  "IncomingDocumentAttachment",
  "IncomingAccountingDocument",
  "IncomingAccountingDocumentOrder",
  "VismaStoragePendingTransactions",
  "IncomingProductData",
  "FileArchive",
  "ApprovalTask",
  "ApprovalTaskChangeLog",
  "ApprovalTaskAttachment",
  "IncomingAccountingDocumentAttachment",
  "AutoInvoiceValidationError",
  "CompanyVatRegister",
  "FactoringInvoiceInformation",
  "DebtCollectionAgreement",
  "AccountingRuleCriteria",
  "AccountingRuleAction",
  "ApprovedReconciliationAttachment",
  "Memo",
  "AllProductTransaction",
  "CustomerCurrentBalance",
  "SupplierCurrentBalance",
]);

export const BusinessNXTWebhookPayloadSchema = z.object({
  tableIdentifier: BusinessModelTables,
  customerNo: z.number(),
  companyNo: z.number(),
  primaryKeys: z.record(z.union([z.string(), z.number()])).array(),
  event: z.enum(["UPDATE", "INSERT", "DELETE"]),
  timestamp: z.string(),
});

export type BusinessNXTWebhookPayload = z.infer<
  typeof BusinessNXTWebhookPayloadSchema
>;
