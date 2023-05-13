using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.CommunityToolkit.Extensions;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using xfLibrary.Pages.Popup;

namespace xfLibrary.ViewModels
{
    class CategoryViewModel : BaseViewModel
    {
        #region Property
        private ObservableCollection<Category> category;
        private List<Category> _categorys;
        private bool isSort = true;

        public ObservableCollection<Category> Categorys { get => category; set => SetProperty(ref category, value); }
        #endregion

        #region Command 
        public ICommand RefreshCommand => new Command(async () =>
        {
            IsBusy = true;

            if (_categorys == null || _categorys?.Count == 0)
                _categorys = await _mainService.CategoryAsync();

            await AddCategory();

            IsBusy = false;
        });

        public ICommand FilterCommand => new Command(() =>
        {
            IsBusy = true;

            ObservableCollection<Category> lsort = null;
            if (isSort)
                lsort = new ObservableCollection<Category>(Categorys.OrderBy(x => x.Name));
            else
                lsort = new ObservableCollection<Category>(Categorys.OrderByDescending(x => x.Name));

            isSort = !isSort;
            Categorys = lsort;
            IsBusy = false;
        });

        public ICommand AddCommand => new Command(async () =>
        {
            var exist = await Shell.Current.ShowPopupAsync(
                        new DetailCategoryPopup(_token));

            if (exist != null)
                Categorys.Insert(0, exist);
        }); 

        public ICommand DeleteCommand => new Command<Category>(async (cate) =>
        {
            var res = await _mainService.DeleteCategoryAsync(cate.Code, _token);
            if (res == null) return;

            if (res.Success)
                Categorys.Remove(cate);

            if (!string.IsNullOrEmpty(res.Message))
                _message.ShortAlert(res.Message);
        });

        public ICommand UpdateCommand => new Command<Category>(async (cate) =>
        {
            var res = await _mainService.DeleteCategoryAsync(cate.Code, _token);
            if (res == null) return;

            if (res.Success)
                Categorys.Remove(cate);

            if (!string.IsNullOrEmpty(res.Message))
                _message.ShortAlert(res.Message);
        });
        #endregion

        public CategoryViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            Categorys = new ObservableCollection<Category>();
        }

        async Task AddCategory()
        {
            var cates = await _mainService.CategoryAsync();

            Categorys.Clear();
            if (cates == null) { IsBusy = false; return; }
            foreach (var cate in cates)
            {
                //update view
                Categorys.Add(cate);
            }
        }
        #endregion
    }
}
