﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using xfLibrary.Domain;
using xfLibrary.Models;
using ZXing;

namespace xfLibrary.ViewModels
{
    class ScanQRViewModel : BaseViewModel
    {
        #region Properties
        private bool isTorchOn;
        private string _qrCode = null;

        public bool IsTorchOn { get => isTorchOn; set => SetProperty(ref isTorchOn, value); }

        #endregion

        #region Command 

        public ICommand ScanResultCommand => new Command<Result>(async (result) =>
        {
            IsBusy = true;

            //remove case scan multi
            if (_qrCode != null && _qrCode == result.Text)
                return;

            //result = token,orderid,status
            //example = asdasdasdasd,kljdgkjasdkjaskdj,64
            _qrCode = result.Text.Trim();
            var qr = new QRCode(_qrCode);
            if (qr == null || string.IsNullOrEmpty(qr.Token)
            || string.IsNullOrEmpty(qr.Id))
            {
                IsBusy = false;
                _message.ShortAlert("Sai format QR Code");
                return;
            }

            //qrcode experted
            if (qr.Start.AddMinutes(5) < DateTime.Now)
            {
                IsBusy = false;
                _message.ShortAlert("QR Code đã hết hạn");
                return;
            }

            Response res = null;
            //call api
            //user ký gửi sách => 4 -> 16 manager xác nhận đã lấy sách
            if (qr.Status == Services.Api.USER_POST_IS_NOT_APPROVED)
            {
                res = await _mainService.AcceptPostAsync(qr.Id, qr.Token);
            }    
            //lấy sách => trả sách 64 -> 128
            else if (qr.Status == Services.Api.USER_TAKE_BOOK)
            {
                res = await _mainService.ReceivedAsync(qr.Id, qr.Token);
            }
            //trả sách => sang trạng thái trả sách thành công 128 -> 256
            else if (qr.Status == Services.Api.USER_RETURN_IS_NOT_APPROVED)
            {
                res = await _mainService.SuccessAsync(qr.Id, qr.Token);
            }
            //thành công => user ký gửi sách đến lấy sách 256 -> 512
            else if (qr.Status == Services.Api.USER_GETBACK_BOOK)
            {
                res = await _mainService.ReturnBookAsync(qr.Id, qr.Token);
            }

            if (res != null)
            {
                if (!string.IsNullOrEmpty(res.Message))
                    _message.ShortAlert(res.Message);

                if (res.Success)
                {
                    IsBusy = false;
                    BackCommand.Execute(null);
                }
            }    

            IsBusy = false;
            Console.WriteLine("QRCode: " + _qrCode);
        });

        public ICommand FlashCommand => new Command(() => IsTorchOn = !IsTorchOn);
        #endregion

        public ScanQRViewModel()
        {
            Init();
        }

        #region Method
        void Init()
        {
            IsTorchOn = false;
        }
        #endregion
    }
}
