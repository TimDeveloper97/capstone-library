using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace xfLibrary.Domain
{
    class BaseModel
    {
        [JsonProperty("#url")]
        public string Url { get; set; }

        [JsonProperty("value")]
        public object Value { get; set; }

        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
