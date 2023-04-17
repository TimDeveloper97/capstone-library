using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class Book : BaseModel
    {
        private string quantity;
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("price")]
        public int Price { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("owner")]
        public string Owner { get; set; }

        [JsonProperty("publisher")]
        public string Publisher { get; set; }

        [JsonProperty("publishYear")]
        public string PublishYear { get; set; }

        [JsonProperty("categories")]
        public List<string> Categories;

        [JsonProperty("author")]
        public string Author { get; set; }

        [JsonProperty("quantity")]
        public string Quantity { get => quantity; set => SetProperty(ref quantity, value); }

        [JsonProperty("imgs")]
        public List<Img> Imgs { get; set; }

        [JsonProperty("percent")]
        public int Percent { get; set; }

        [JsonProperty("inStock")]
        public int InStock { get; set; }

        [JsonProperty("bookInfoDtos")]
        public List<State> States { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }


        private int number = 0, expanderHeight = 0; 
        private bool isChecked = false, isNotUser = false;
        [JsonIgnore]
        public bool IsChecked { get => isChecked; set => SetProperty(ref isChecked, value); }
        [JsonIgnore]
        public int ExpanderHeight { get => expanderHeight; set => SetProperty(ref expanderHeight, value); }
        [JsonIgnore]
        public int PreTotal { get; set; } = 0;
        [JsonIgnore]
        public int Number { get => number; set => SetProperty(ref number, value); }
        [JsonIgnore]
        public bool IsNotUser { get => isNotUser; set => SetProperty(ref isNotUser, value); }
        [JsonIgnore]
        public string ImageSource { get; set; } = Services.Api.IconBook;
        [JsonIgnore]
        public string StringCategories { get; set; }
    }

    public class ListBook
    {
        public ObservableCollection<Book> Books { get; set; }
    }

    public class Img : BaseModel
    {
        [JsonProperty("fileName")]
        public string FileName { get; set; }

        [JsonProperty("data")]
        public string Data { get; set; }
    }

    public class State
    {
        [JsonProperty("quantity")]
        public int Quantity { get; set; }

        [JsonProperty("renterId")]
        public string RenterId { get; set; }

        [JsonProperty("renter")]
        public string Renter { get; set; }

        [JsonProperty("status")]
        public int Status { get; set; }
    }
}
