<template>
  <div>
    <Navbar />

    <div class="container">
      <div class="text-wrapper">
        <div class="betreiber-wrapper">
          <h4>Seitenbetreiber</h4>
          <br />
          <p>Susanne von Siemens</p>
          <p>Lindach 1</p>
          <p>84529 Tittmoning</p>
          <br />
          <br />

          <h4>Kontaktdaten des Betreibers</h4>
          <br />
          <p>s.v.siemens@web.de</p>
          <p>08683/1625</p>
        </div>

        <div class="agb-wrapper">
          <h4>AGBs</h4>
          <p>Soweit Sie Ihre Einwilligung erklärt haben, wird auf dieser Website Google Analytics eingesetzt, ein Webanalysedienst der Google Ireland Limited (&bdquo;Google&ldquo;). Die Nutzung umfasst die Betriebsart &bdquo;Universal Analytics&ldquo;. Hierdurch ist es möglich, Daten, Sitzungen und Interaktionen über mehrere Geräte hinweg einer pseudonymen User-ID zuzuordnen und so die Aktivitäten eines Nutzers geräteübergreifend zu analysieren.</p>

          <p>
            Google Analytics verwendet sog. &bdquo;Cookies&ldquo;, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser Website, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Wir weisen Sie darauf hin, dass auf dieser Webseite Google Analytics um eine IP-Anonymisierung erweitert wurde, um eine anonymisierte Erfassung von IP-Adressen (sog. IP-Masking) zu gewährleisten. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Nähere Informationen zu Nutzungsbedingungen und Datenschutz finden Sie unter
            <a
              href="https://www.google.com/analytics/terms/de.html"
              target="_blank"
            >https://www.google.com/analytics/terms/de.html</a> bzw. unter
            <a
              href="https://policies.google.com/?hl=de"
              target="_blank"
            >https://policies.google.com/?hl=de</a>.
          </p>

          <p>
            <strong>Zwecke der Verarbeitung</strong>
            <br />Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.
          </p>
          <p>
            <strong>Rechtsgrundlage</strong>
            <br />Die Rechtsgrundlage für den Einsatz von Google Analytics ist Ihre Einwilligung gemäß
            <a
              href="https://dsgvo-gesetz.de/art-6-dsgvo/"
              target="_blank"
            >Art. 6 Abs. 1 S.1 lit. a DSGVO</a>.
          </p>
          <p>
            <strong>Empfänger / Kategorien von Empfängern</strong>
            <br />Der Empfänger der erhobenen Daten ist Google.
          </p>
          <p>
            <strong>Übermittlung in Drittstaaten</strong>
            <br />Die personenbezogenen Daten werden unter dem EU-US Privacy Shield auf Grundlage des Angemessenheitsbeschlusses der Europäischen Kommission in die USA übermittelt. Das Zertifikat können Sie
            <a
              href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI"
              target="_blank"
            >hier</a> abrufen.
          </p>
          <p>
            <strong>Dauer der Datenspeicherung</strong>
            <br />Die von uns gesendeten und mit Cookies, Nutzerkennungen (z. B. User-ID) oder Werbe-IDs verknüpften Daten werden nach 14 Monaten automatisch gelöscht. Die Löschung von Daten, deren Aufbewahrungsdauer erreicht ist, erfolgt automatisch einmal im Monat.
          </p>
          <p>
            <strong>Betroffenenrechte</strong>
            <br />Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können.
          </p>

          <p>
            Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie das
            <a
              href="https://tools.google.com/dlpage/gaoptout?hl=de"
              target="_blank"
            >Browser-Add-on</a> herunterladen und installieren. Opt-Out-Cookies verhindern die zukünftige Erfassung Ihrer Daten beim Besuch dieser Website. Um die Erfassung durch Universal Analytics über verschiedene Geräte hinweg zu verhindern, müssen Sie das Opt-Out auf allen genutzten Systemen durchführen. Wenn Sie hier klicken, wird das Opt-Out-Cookie gesetzt:
            <a
              href="javascript:gaOptout()"
            >
              <strong>Google Analytics deaktivieren</strong>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-wrapper {
  font-size: 1rem;
  margin: 100px 0;
  .betreiber-wrapper {
    margin: 100px 0;
  }
}
</style>

<script>
import Navbar from "~/layouts/components/navbar";
export default {
  components: {
    Navbar
  }
};
</script>
