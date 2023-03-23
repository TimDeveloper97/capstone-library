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
        [JsonProperty("borrowedDate")]
        public long? CreateDate { get; set; }

        [JsonProperty("postId")]
        public string PostId { get; set; }

        [JsonProperty("userId")]
        public string User { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }

        [JsonProperty("totalPrice")]
        public int Total { get; set; }

        [JsonProperty("noDays")]
        public int NumberOfRentalDays { get; set; }


        private string color = "#00000";
        [JsonIgnore]
        public string Color { get => color; set => SetProperty(ref color, value); }
        [JsonIgnore]
        public DateTime ReturnDate { get; set; }
        [JsonIgnore]
        public string Message { get; set; }
        [JsonIgnore]
        public bool IsAdmin { get; set; } = false;
    }
}
