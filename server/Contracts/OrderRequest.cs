using YourNamespace.Models;

namespace YourNamespace.Contracts
{
    public class OrdersRequest
    {
        public List<CartItem> Orders { get; set; }
    }
}