using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
}
