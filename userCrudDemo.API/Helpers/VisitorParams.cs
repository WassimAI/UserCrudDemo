namespace userCrudDemo.API.Helpers
{
    public class VisitorParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 5;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public int UserId { get; set; }
        public string EmailText { get; set; }
        public string NameText { get; set; }
        public string OrderBy { get; set; }
    }
}