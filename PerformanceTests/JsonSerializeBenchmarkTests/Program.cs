using BenchmarkDotNet.Running;


namespace JsonSerializeBenchmarkTests
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var summary = BenchmarkRunner.Run<CheckItemJsonSerializePerformance>();
        }
    }
}
