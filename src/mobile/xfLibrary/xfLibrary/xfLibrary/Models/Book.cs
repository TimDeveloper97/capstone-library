﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class Book : BaseModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("price")]
        public string Price { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("publisher")]
        public string Publisher { get; set; }

        [JsonProperty("publishYear")]
        public string PublishYear { get; set; }

        [JsonProperty("categories")]
        public List<string> Categories { get; set; }

        [JsonProperty("quantity")]
        public string Quantity { get; set; }

        [JsonIgnore]
        public bool IsChecked { get; set; } = false;
        [JsonIgnore]
        public double PreTotal { get; set; } = 0;
    }

    public class ListBook
    {
        public ObservableCollection<Book> Books { get; set; }
    }
}
