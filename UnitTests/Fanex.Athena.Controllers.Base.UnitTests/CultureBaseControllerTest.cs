namespace Fanex.Athena.Controllers.Base.UnitTests
{
    using Microsoft.Win32.SafeHandles;
    using NSubstitute;
    using NUnit.Framework;
    using System;
    using System.Runtime.InteropServices;
    using UnitTest.Common.Helpers;

    [TestFixture]
    public class CultureBaseControllerTest : CultureBaseControllerHelperTest, IDisposable
    {
        private FakeCultureBaseController _controller;
        bool disposed = false;
        private readonly SafeHandle handle = new SafeFileHandle(IntPtr.Zero, true);

        [SetUp]
        public void SetUp()
        {
            _controller = new FakeCultureBaseController(LangService, SessionService);
        }

        [TearDown]
        public void TearDown()
        {
            _controller.Dispose();
        }

        [Test]
        public void Initialize_WhenCall_SetPageCulture()
        {
            // Arrange
            const string Language = "en";
            LangService.GetCurrentLanguage().Returns(Language);
            var controllerContext = MvcHelper.CreateControllerContext();
            var url = MvcHelper.CreateUrlHelper(controllerContext.HttpContext);

            // Action
            _controller.Initialize(url.RequestContext);

            // Assert
            LangService.Received().SetPageCulture(Language);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            if (disposed)
                return;

            if (disposing)
            {
                handle.Dispose();
                if (_controller != null)
                {
                    _controller.Dispose();
                }

            }

            disposed = true;
        }
    }
}