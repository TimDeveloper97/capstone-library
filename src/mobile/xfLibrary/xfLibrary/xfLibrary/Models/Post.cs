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
        private string address;

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("createdDate")]
        public long? CreatedDate { get; set; }

        [JsonProperty("returnDate")]
        public long? ReturnDate { get; set; }

        [JsonProperty("modifiedDate")]
        public long? ModifiedDate { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }

        [JsonProperty("fee")]
        public int Fee { get; set; } = 0;

        [JsonProperty("noDays")]
        public int NumberOfRentalDays { get; set; } = 0;

        [JsonProperty("user")]
        public string User { get; set; } = "Anonymous";

        [JsonProperty("postDetailDtos")]
        public ObservableCollection<Order> Order { get; set; }

        [JsonProperty("address")]
        public string Address { get => address; set => SetProperty(ref address, value); }

        [JsonProperty("money")]
        public int Money { get; set; }


        private int maxLines = 3;
        private bool isChecked = false;

        [JsonIgnore]
        public ObservableCollection<string> Slide { get; set; }
        [JsonIgnore]
        public int TotalReturnDay { get; set; }
        [JsonIgnore]
        public string ImageSource { get; set; } = "book100.png";
        [JsonIgnore]
        public string Color { get; set; } = "#00000";
        [JsonIgnore]
        public bool IsAdmin { get; set; } = false;
        [JsonIgnore]
        public bool IsChecked
        {
            get => isChecked; set => SetProperty(ref isChecked, value);
        }
        [JsonIgnore]
        public int MaxLines { get => maxLines; set => SetProperty(ref maxLines, value); }


        public Post()
        {
            Order = new ObservableCollection<Order>();
            Slide = new ObservableCollection<string>() { "book100.png" };
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
