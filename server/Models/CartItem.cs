namespace YourNamespace.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Size { get; set; } // optional, not used by stripe 
        public string? Image { get; set; } // optional, not used by stripe 
        public int Price { get; set; } 
        public int Quantity { get; set; }
        public string? Description { get; set; } // optional, not used by stripe 
    }
}
