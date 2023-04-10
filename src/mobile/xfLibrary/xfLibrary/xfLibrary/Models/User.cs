using Newtonsoft.Json;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace ChatApp.Models
{
    public class User : BaseModel
    {
        //message
        [JsonIgnore]
        public string Name { get; set; }
        [JsonIgnore]
        public string Image { get; set; }
        [JsonIgnore]
        public Color Color { get; set; }

        private int status;
        //user
        [JsonProperty("address")]
        public string Address { get; set; }

        [JsonProperty("balance")]
        public string Balance { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("firstName")]
        public string FirstName { get; set; }

        [JsonProperty("lastName")]
        public string LastName { get; set; }

        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("status")]
        public int Status { get => status; set => SetProperty(ref status, value); }

        [JsonProperty("roles")]
        public string[] Roles { get; set; }


        private int level = 0;
        [JsonIgnore]
        public int Level { get => level; set => SetProperty(ref level, value); }
    }
}