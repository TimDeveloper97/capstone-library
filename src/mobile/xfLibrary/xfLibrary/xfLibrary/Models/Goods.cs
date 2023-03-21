using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class Goods : Basemodel
    {
        [JsonProperty("createDate")]
        public long? CreateDate { get; set; }

        [JsonProperty("returnDate")]
        public long? ReturnDate { get; set; }

        [JsonProperty("postId")]
        public string PostId { get; set; }

        [JsonProperty("user")]
        public string User { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }

        [JsonProperty("total")]
        public int Total { get; set; }


        private string color = "#00000";
        [JsonIgnore]
        public string Color { get => color; set => SetProperty(ref color, value); }
        [JsonIgnore]
        public int Day { get; set; }
    }
}
