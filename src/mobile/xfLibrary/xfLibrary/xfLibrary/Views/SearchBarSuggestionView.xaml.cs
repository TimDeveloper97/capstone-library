using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using xfLibrary.Models;

namespace xfLibrary.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SearchBarSuggestionView : ContentView
    {
        public SearchBarSuggestionView()
        {
            InitializeComponent();
        }

        public static readonly BindableProperty IsSearchingProperty =
        BindableProperty.Create("IsSearching", typeof(bool), typeof(SearchBarSuggestionView), false);

        public bool IsSearching
        {
            get { return (bool)GetValue(IsSearchingProperty); }
            set { SetValue(IsSearchingProperty, value); }
        }

        public static readonly BindableProperty ItemsSourceProperty =
                BindableProperty.Create("ItemsSource", typeof(ObservableCollection<Post>), typeof(SearchBarSuggestionView));

        public ObservableCollection<Post> ItemsSource
        {
            get { return (ObservableCollection<Post>)GetValue(ItemsSourceProperty); }
            set { SetValue(ItemsSourceProperty, value); }
        }

        public static readonly BindableProperty SelectItemProperty =
        BindableProperty.Create("SelectItem", typeof(Post), typeof(SearchBarSuggestionView), default(Post));

        public Post SelectItem
        {
            get { return (Post)GetValue(SelectItemProperty); }
            set { SetValue(SelectItemProperty, value); }
        }

        public static readonly BindableProperty SelectedCommandProperty =
            BindableProperty.Create(nameof(SelectedCommand), typeof(ICommand), typeof(SearchBarSuggestionView), null);
        public ICommand SelectedCommand
        {
            get => (ICommand)GetValue(SelectedCommandProperty);
            set => SetValue(SelectedCommandProperty, value);
        }

        public static readonly BindableProperty SelectedCommandParameterProperty =
            BindableProperty.Create(nameof(SelectedCommandParameter), typeof(Post), typeof(SearchBarSuggestionView), default(Post));
        public Post SelectedCommandParameter
        {
            get => (Post)GetValue(SelectedCommandParameterProperty);
            set => SetValue(SelectedCommandParameterProperty, value);
        }
    }
}