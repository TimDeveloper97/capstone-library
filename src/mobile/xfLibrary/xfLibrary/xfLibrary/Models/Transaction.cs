using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class Transaction : BaseModel
    {
        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("user")]
        public string User { get; set; }
        [JsonProperty("money")]
        public double Money { get; set; }
        [JsonProperty("date")]
        public long CreatedDate { get; set; }


        private int maxLines = 1;
        [JsonIgnore]
        public DateTime Date { get; set; }
        [JsonIgnore]
        public int MaxLines { get => maxLines; set => SetProperty(ref maxLines, value); }
    }

    class TransactionGroup : ObservableCollection<Transaction>
    {
        public DateTime Date { get; private set; }

        public TransactionGroup(DateTime date)
            : base()
        {
            Date = date;
        }

        public TransactionGroup(DateTime date, IEnumerable<Transaction> source)
            : base(source)
        {
            Date = date;
        }
    }
}
