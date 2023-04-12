using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    class QRCode : BaseModel
    {
        DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        [JsonProperty("time")]
        public long Time { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("orderId")]
        public string Id { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }


        [JsonIgnore]
        public DateTime Start { get; set; }

        public QRCode(string qr)
        {
            try
            {
                var m = JsonConvert.DeserializeObject<QRCode>(qr);

                Time = m.Time;
                Token = m.Token;
                Status = m.Status;
                Id = m.Id;
                Start = start.AddMilliseconds(m.Time).ToLocalTime();
            }
            catch (Exception)
            { }
        }
    }
}
