﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class Category : BaseModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("nameCode")]
        public string Code { get; set; }

        public string Image { get; set; }
    }

}