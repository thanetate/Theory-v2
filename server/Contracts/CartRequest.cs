using YourNamespace.Models;

namespace YourNamespace.Contracts
{
    public class CartRequest
    {
        public List<CartItem> Cart { get; set; }
    }
}