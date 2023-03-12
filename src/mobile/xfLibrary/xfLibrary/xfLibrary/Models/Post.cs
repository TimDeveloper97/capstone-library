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

        [JsonProperty("manager")] 
        public string Manager { get; set; }

        [JsonProperty("user")]
        public string User { get; set; }

        [JsonProperty("imgs")]
        public ObservableCollection<string> Imgs { get; set; }


        [JsonIgnore]
        public int MaxLines { get; set; } = 3;
        [JsonIgnore]
        public int Height { get; set; }
        [JsonIgnore]
        public ImageSource ImageSource { get; set; }
        [JsonIgnore]
        public ObservableCollection<Book> Books { get; set; }
        
    }
}
