import * as PaymentScreen from "@point_of_sale/../tests/tours/utils/payment_screen_util";
import * as Dialog from "@point_of_sale/../tests/tours/utils/dialog_util";
import * as ProductScreen from "@point_of_sale/../tests/tours/utils/product_screen_util";
import * as Chrome from "@point_of_sale/../tests/tours/utils/chrome_util";
import * as ReceiptScreen from "@point_of_sale/../tests/tours/utils/receipt_screen_util";
import { registry } from "@web/core/registry";

registry.category("web_tour.tours").add("CancelOrderTour", {
    checkDelay: 50,
    steps: () => [
        // Start POS session and confirm session opening
        Chrome.startPoS(),
        Dialog.confirm("Open Register"),

        // Create and pay the first order
        ProductScreen.clickDisplayedProduct("Desk Organizer"),
        ProductScreen.clickPayButton(),
        PaymentScreen.clickPaymentMethod("Cash"),
        PaymentScreen.clickValidate(),
        ReceiptScreen.isShown(),
        ReceiptScreen.clickNextOrder(),

        // Get first order id
        {
            content: "Get first order id",
            trigger: ".pos-topheader .pos-leftheader .list-container-items > div > button.active",
            run: async () => {
                const orderIdButton = document.querySelector(".pos-topheader .pos-leftheader .list-container-items > div > button.active");
                window.firstOrderId = orderIdButton ? orderIdButton.textContent.trim() : null;
            }
        },

        // Create a second order but cancel it via Cancel Order button
        ProductScreen.clickDisplayedProduct("Desk Organizer"),
        ProductScreen.clickDisplayedProduct("Letter Tray"),
        ProductScreen.clickReview(),
        ProductScreen.clickControlButton("Cancel Order"),
        Dialog.confirm(),

        // Create and pay a third order
        ProductScreen.clickDisplayedProduct("Desk Organizer"),
        ProductScreen.clickPayButton(),
        PaymentScreen.clickPaymentMethod("Cash"),
        PaymentScreen.clickValidate(),
        ReceiptScreen.isShown(),
        ReceiptScreen.clickNextOrder(),

        // Get third order id
        {
            content: "Get third order ID",
            trigger: ".pos-topheader .pos-leftheader .list-container-items > div > button.active",
            run: async () => {
                const orderIdButton = document.querySelector(".pos-topheader .pos-leftheader .list-container-items > div > button.active");
                window.thirdOrderId = orderIdButton ? orderIdButton.textContent.trim() : null;
            }
        },
    ].flat(),
});
