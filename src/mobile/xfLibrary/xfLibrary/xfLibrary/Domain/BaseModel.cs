using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace xfLibrary.Domain
{
    public class BaseModel : BaseBinding
    {
        [JsonProperty("Id")]
        public string Id { get; set; }

        [JsonProperty("CreationDate")]
        public DateTime CreationDate { get; set; }
    }
}
