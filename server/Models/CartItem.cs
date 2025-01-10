namespace YourNamespace.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Size { get; set; } // Optional: Not used by Stripe, but could be included for reference
        public string? Image { get; set; } // Optional: Not used by Stripe
        public int Price { get; set; } // Price in dollars
        public int Quantity { get; set; }
        public string? Description { get; set; } // Optional
    }
}
