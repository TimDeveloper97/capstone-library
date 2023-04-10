using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    class QRCode : BaseModel
    {
        [JsonProperty("time")]
        public DateTime Time { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("orderId")]
        public string OrderId { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }

        public QRCode(string qr)
        {
            try
            {
                var m = JsonConvert.DeserializeObject<QRCode>(qr);

                Time = m.Time;
                Token = m.Token;
                Status = m.Status;
                OrderId = m.OrderId;
            }
            catch (Exception)
            {}
        }
    }
}
