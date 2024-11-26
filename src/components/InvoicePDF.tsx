import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { getMonthName, getMonthPeriod } from "@/lib/date-utils";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 30,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 9,
    marginBottom: 2,
  },
  addressSection: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
  },
  emetteurSection: {
    width: "45%",
  },
  destinataireSection: {
    width: "55%",
  },
  addressLabel: {
    marginBottom: 5,
    fontSize: 10,
  },
  greyBox: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    height: 120,
  },
  whiteBox: {
    border: 1,
    padding: 10,
    height: 120,
  },
  companyInfo: {
    fontSize: 9,
    marginBottom: 3,
  },
  currencyNote: {
    fontSize: 8,
    textAlign: "right",
    marginBottom: 10,
  },
  tableContainer: {
    border: 1,
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: 1,
    backgroundColor: "#f5f5f5",
  },
  tableContent: {
    flexDirection: "row",
    minHeight: 350,
  },
  colDesignation: {
    width: "40%",
    padding: 5,
    borderRight: 1,
  },
  colTVA: {
    width: "15%",
    padding: 5,
    borderRight: 1,
    textAlign: "center",
  },
  colPU: {
    width: "15%",
    padding: 5,
    borderRight: 1,
    textAlign: "right",
  },
  colQte: {
    width: "15%",
    padding: 5,
    borderRight: 1,
    textAlign: "center",
  },
  colTotal: {
    width: "15%",
    padding: 5,
    textAlign: "right",
  },
  bottomSection: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  conditions: {
    fontSize: 9,
  },
  totalsSection: {
    width: "30%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    padding: 3,
  },
  ttcBackground: {
    backgroundColor: "#e0e0e0",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
  },
  legalText: {
    fontSize: 7,
    marginBottom: 2,
  },
  bankDetails: {
    fontSize: 7,
    marginBottom: 5,
  },
  pageNumber: {
    fontSize: 8,
    textAlign: "right",
  },
});

export default function InvoicePDF({ data }) {
  const totalHT = data.prix * data.quantite;
  const tvaAmount = (totalHT * data.tva) / 100;
  const totalTTC = totalHT + tvaAmount;
  const monthName = getMonthName(data.month);
  const period = getMonthPeriod(data.month);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Facture {monthName} 2024</Text>
          <Text style={styles.date}>
            Date facturation : {data.dateFacturation}
          </Text>
          <Text style={styles.date}>Date échéance : {data.dateEcheance}</Text>
          <Text style={styles.date}>Période : {period}</Text>
        </View>

        <View style={styles.addressSection}>
          <View style={styles.emetteurSection}>
            <Text style={styles.addressLabel}>Émetteur</Text>
            <View style={styles.greyBox}>
              <Text style={styles.companyInfo}>SCI TORI</Text>
              <Text style={styles.companyInfo}>150 RUE DE GERLAND</Text>
              <Text style={styles.companyInfo}>69007 LYON</Text>
              <Text style={styles.companyInfo}>0678369633</Text>
              <Text style={styles.companyInfo}>contact@jtbrands.fr</Text>
            </View>
          </View>

          <View style={styles.destinataireSection}>
            <Text style={styles.addressLabel}>Adressé à</Text>
            <View style={styles.whiteBox}>
              <Text style={styles.companyInfo}>
                Madame BELOUSSA-CHERIFI Anais
              </Text>
              <Text style={styles.companyInfo}>150 RUE DE GERLAND</Text>
              <Text style={styles.companyInfo}>69007 LYON</Text>
            </View>
          </View>
        </View>

        <Text style={styles.currencyNote}>Montants exprimés en Euros</Text>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesignation}>Désignation</Text>
            <Text style={styles.colTVA}>TVA</Text>
            <Text style={styles.colPU}>P.U. HT</Text>
            <Text style={styles.colQte}>Qté</Text>
            <Text style={styles.colTotal}>Total HT</Text>
          </View>

          <View style={styles.tableContent}>
            <View style={styles.colDesignation}>
              <Text>{`${monthName} 2024 - ${data.designation}`}</Text>
            </View>
            <Text style={styles.colTVA}>{data.tva}%</Text>
            <Text style={styles.colPU}>{Number(data.prix).toFixed(2)}</Text>
            <Text style={styles.colQte}>{data.quantite}</Text>
            <Text style={styles.colTotal}>
              {(data.prix * data.quantite).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.conditions}>
            Conditions de règlement: {data.paymentTerms}
          </Text>
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text>Total HT</Text>
              <Text>{totalHT.toFixed(2)} €</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>TVA {data.tva}%</Text>
              <Text>{tvaAmount.toFixed(2)} €</Text>
            </View>
            <View style={[styles.totalRow, styles.ttcBackground]}>
              <Text>Total TTC</Text>
              <Text>{totalTTC.toFixed(2)} €</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.legalText}>{data.legalText}</Text>
          <Text style={styles.bankDetails}>{data.bankDetails}</Text>
          <Text style={styles.pageNumber}>1 / 1</Text>
        </View>
      </Page>
    </Document>
  );
}