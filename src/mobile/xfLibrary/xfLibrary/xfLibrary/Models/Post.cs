using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class Post : BaseModel
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("createdDate")]
        public DateTime? CreatedDate { get; set; }

        [JsonProperty("returnDate")]
        public DateTime? ReturnDate { get; set; }

        [JsonProperty("modifiedDate")]
        public DateTime? ModifiedDate { get; set; }

        [JsonProperty("status")] 
        public int Status { get; set; }

        [JsonProperty("fee")]
        public double Fee { get; set; }

        [JsonProperty("noDays")]
        public int NumberOfRentalDays { get; set; }

        [JsonProperty("user")]
        public string User { get; set; }

        [JsonProperty("postDetailDtos")]
        public ObservableCollection<Order> Order { get; set; }


        private int maxLines = 3;
        [JsonIgnore]
        public int TotalCreateDay { get; set; }
        [JsonIgnore]
        public ObservableCollection<string> Slide { get; set; }
        [JsonIgnore]
        public int TotalReturnDay { get; set; }
        [JsonIgnore]
        public string ImageSource { get; set; }
        [JsonIgnore]
        public int MaxLines { get => maxLines; set => SetProperty(ref maxLines, value); } 

        public Post()
        {
            Order = new ObservableCollection<Order>();
            Slide = new ObservableCollection<string>();
        }
    }

    public class Order
    {
        [JsonProperty("bookDto")]
        public Book Book { get; set; }

        [JsonProperty("quantity")]
        public int Quantity { get; set; }
    }
}
