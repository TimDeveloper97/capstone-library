using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class Config : BaseModel
    {
        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("value")]
        public int Value { get; set; }
    }
}
