using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class Notification : BaseModel
    {
        private int status = 0;
        [JsonProperty("description")]
        public string Message { get; set; }

        [JsonProperty("createdDate")]
        public long CreatedDate { get; set; }

        [JsonProperty("status")]
        public int Status { get => status; set => SetProperty(ref status, value); }


        private int maxLines = 1;
        [JsonIgnore]
        public DateTime Date { get; set; }
        [JsonIgnore]
        public int MaxLines { get => maxLines; set => SetProperty(ref maxLines, value); }
    }

    class NotificationGroup : ObservableCollection<Notification>
    {
        public DateTime Date { get; private set; }

        public NotificationGroup(DateTime date)
            : base()
        {
            Date = date;
        }

        public NotificationGroup(DateTime date, IEnumerable<Notification> source)
            : base(source)
        {
            Date = date;
        }
    }
}
