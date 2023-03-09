using Newtonsoft.Json;
using Xamarin.Forms;
using xfLibrary.Domain;

namespace ChatApp.Models
{
    public class User : BaseModel
    {
        //message
        public string Name { get; set; }
        public string Image { get; set; }
        public Color Color { get; set; }

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

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("roles")]
        public string[] Roles { get; set; }
    }
}