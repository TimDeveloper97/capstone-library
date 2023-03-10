using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace xfLibrary.Domain
{
    public class BaseModel : BaseBinding
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("creationDate")]
        public DateTime CreationDate { get; set; }
    }

    public class Response : BaseModel
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("value")]
        public object Value { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("success")]
        public bool Success { get; set; }
    }
}
