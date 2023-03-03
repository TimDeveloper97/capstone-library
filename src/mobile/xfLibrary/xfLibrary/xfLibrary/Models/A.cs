using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using xfLibrary.Domain;

namespace xfLibrary.Models
{
    public class A : BaseBinding
    {
        private string text;
        private int maxLines, height;
        private ObservableCollection<string> slide;

        public string Text { get => text; set => SetProperty(ref text, value); }
        public ObservableCollection<string> Slide { get => slide; set => SetProperty(ref slide, value); }
        public int MaxLines { get => maxLines; set => SetProperty(ref maxLines, value); }
        public int Height { get => height; set => SetProperty(ref height, value); }

    }
}
