namespace Domain
{
  public class Activity
    {
        public Guid Id { get; set; }
       // [Required]  // This is domain layer. Use application layer instead.
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
  }
}