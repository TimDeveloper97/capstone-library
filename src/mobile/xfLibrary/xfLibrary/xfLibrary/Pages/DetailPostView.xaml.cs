﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.ViewModels;

namespace xfLibrary.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class DetailPostView : ContentPage
    {
        public DetailPostView()
        {
            InitializeComponent();
            BindingContext = new DetailPostViewModel();
        }
    }
}