import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

function PowerBITesting() {
  return (
    <div className="">
      <header className="">
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual and qna
            id: "370b45df-2e31-42bf-a9e0-41159cdc9b0b",
            embedUrl:
              "https://app.powerbi.com/reportEmbed?reportId=370b45df-2e31-42bf-a9e0-41159cdc9b0b&groupId=4678ecce-a887-4d9c-ac37-082258bcafaa&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJ1c2FnZU1ldHJpY3NWTmV4dCI6dHJ1ZX19",
            accessToken:
              "H4sIAAAAAAAEAB2Tt66EVgAF_-W1WIIlY8kFOS5xCUtHjpecLf-7n91PcTSa8_ePndz9mOQ_f_4MHtAjHV5WC7jPZkxuPUSyjs-Kt6CmqjeywbreXcvoCAua82zY85jMZbUBSourQn1NYFg23JbPzKSHQHAiFhNudu44liDJFb-V805BOCDjM9IRbvbVK0vYWU0rrQ2M4jub8K2N5PUoIA-JV5W4vGSUEWx1qQ3F6sKDtoubAPKDDtu6znEY1TQnOxmOkSj9DMVP6cjLo9OxrtLgBliI9YpgH28fopZoNgRbIRHRxT_VyJXl7TInaQO18d2MN7EtH1LIIrvMa9stXlE2dhBmn2wGVSsaYfta676kYixfr4CIW0JMX4WHFIdOGl6Qg3_clUqG7yr1xiU6YXHRml9cTl2BQeolGb0bRcLU2EDtUMvMSHzMRpMfGzqwBnc7y_PAcgfmtDjcVIpiMM4aLAX-R4aj94dZXLaESVvMhAreMSFSSH4YPyBSug-R8gRnju8rk7bIg0uHIQd3JVDoyOKkA4yz81d-L6G13R8GcYcUtcIP50SdeFP3u0CtvpmzLfqw-a43XNuEbejmv6NmkvlSsZi-UNNKCSYBPVmOUzp19OtDNgcpyhvYEjZzW4ekES8swSgK5D3pWIGqGA84vO6T_kGnq1poIrji4f2VtsN1eIL03lZGIrCV2LSB03QC3yPE70txkAG_F0x9j7NHJJDIGxSG5VskkLpyNXgXYMuKgvJ0eVxla-7sgUrB41DMpMzKnq2mFEC3UUs9SO3F1F1g4GyEahnsukPQNa6Mztks65C7K_MH_Wz70D6gVpMcPw_UKNkuhRurF4PYL_wvnyBN-qkZxU_etoTO0cl8vWifyyXh3_rhxYb5NL4v0HmEsVvZaNqJ_Pzxwy_3tI16cf_eSTBB4ZmKXpD70BwipDKZd9ylK75KKoIK2a43yWs7atTeozu1nFK32HYc3MdNXWpwd-MlDzXIRuEsHcyxeaqqcH9ID1_LTmuUHF-w5ZojG1MitkGaitoJoUQw14toVITSyo6dT8R-WxZXN6FmwgU5MC2k15Kui3Vs1FT7HROackIK7kb6V27NuZDD7tgsuYFSvnDUjGzeKEC1k2HCzTPz8lw0f4dodXCXBjUMTRVHdiLxKJmESZtI1aJiRqg9XiPgg0W_QyREFuIGt-M93b212cNIj24kTrs82x5ZpZ3Z5FuqP8WYrt1t87kPlTDcWz4ZnxraTn335k0GgVbFtJRTcd5Wf_31n-Z7qotFDX4t634SkuvNph5PcpbeSqyac-f_lNdUQ7L9lvWLaXPQPMdIGrdrzacxFterKtQaT5XP8tmDXQKaJ7oAGvlhVTGAPkPpJcN-HSzGU-xavGsORJItD3vcbsPnDutUsNHuRvX-rkwlLM7Nu776LkRZgWQnPH1bNT1x4gsI86hl2HW8-StR3LW76hqOAo-kr-HkOF6foO5CF71ia8CKFtN7MjXyYlpUfsqdRf42rza_gtvJkmwosPrLT63WcXmQM9UpoCVmqKxmW_SqfLb8aytFmNUQxhauM6y0Nvvxb546Kau5Mj1hpJlZ8ggz8JVAp7mTJlj_O8Sqs_dEHJhHU9k1QK6udYpjfgBf8kLew8LlVFLdB5pDsOD4BGqmnGIy6Mp_mv_5FyDgxK5CBgAA.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUlORElBLUNFTlRSQUwtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZXhwIjoxNzE4OTY3ODkzLCJhbGxvd0FjY2Vzc092ZXJQdWJsaWNJbnRlcm5ldCI6dHJ1ZX0=",
            tokenType: models.TokenType.Aad,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true,
                },
              },
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName={"Embed-container"}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </header>
    </div>
  );
}

export default PowerBITesting;
