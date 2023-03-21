import React from "react";

export default function Order() {
  return (
    <>
      <section class="hero-area bg-white shadow-sm pt-80px pb-80px">
        <span class="icon-shape icon-shape-1"></span>
        <span class="icon-shape icon-shape-2"></span>
        <span class="icon-shape icon-shape-3"></span>
        <span class="icon-shape icon-shape-4"></span>
        <span class="icon-shape icon-shape-5"></span>
        <span class="icon-shape icon-shape-6"></span>
        <span class="icon-shape icon-shape-7"></span>
        <div class="container">
          <div class="hero-content text-center">
            <h2 class="section-title pb-3">Shopping cart</h2>
          </div>
        </div>
      </section>
      <section class="cart-area pt-80px pb-80px position-relative">
        <div class="container">
          <form action="#" class="cart-form mb-50px table-responsive px-2">
            <table class="table generic-table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div class="media media-card align-items-center shadow-none p-0 mb-0 rounded-0 bg-transparent">
                      <a href="#" class="media-img d-block media-img-sm">
                        <img src="images/product-img.jpg" alt="Product image" />
                      </a>
                      <div class="media-body">
                        <h5 class="fs-15 fw-medium">
                          <a href="#">Chocolate bar</a>
                        </h5>
                      </div>
                    </div>
                  </th>
                  <td>$22</td>
                  <td>
                    <div class="quantity-item d-inline-flex align-items-center">
                      <button class="qtyBtn qtyDec" type="button">
                        <i class="la la-minus"></i>
                      </button>
                      <input
                        class="qtyInput"
                        type="text"
                        name="qty-input"
                        value="1"
                      />
                      <button class="qtyBtn qtyInc" type="button">
                        <i class="la la-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td>$44</td>
                  <td>
                    <a
                      href="#"
                      class="icon-element icon-element-xs shadow-sm"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Remove item"
                    >
                      <i class="la la-times"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colspan="6">
                    <div class="cart-actions d-flex align-items-center justify-content-between">
                      <div class="input-group my-2 w-auto">
                        <div class="input-group-append">
                          <button class="btn theme-btn">Apply coupon</button>
                        </div>
                      </div>
                      <div class="flex-grow-1 text-right my-2">
                        <button class="btn theme-btn">Update cart</button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div class="cart-totals w-50 ml-auto table-responsive px-2">
            <h3 class="mb-4 fs-24">Cart totals</h3>
            <table class="table generic-table overflow-hidden">
              <tbody>
                <tr>
                  <th scope="row">Subtotal</th>
                  <td>$44</td>
                </tr>
                <tr>
                  <th scope="row">Total</th>
                  <td>$44</td>
                </tr>
              </tbody>
            </table>
            <div class="proceed-to-checkout-wrap mt-5">
              <a href="checkout.html" class="btn theme-btn w-100 fs-18 lh-50">
                Proceed to checkout
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
