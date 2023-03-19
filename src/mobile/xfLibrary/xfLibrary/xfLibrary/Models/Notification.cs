using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    class Notification : BaseModel
    {
        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("date")]
        public DateTime Date { get; set; }


        private int maxLines = 1;
        [JsonIgnore]
        public string Color { get; set; } = "#6E6E6E";
        [JsonIgnore]
        public int Number { get; set; } = 0;
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
