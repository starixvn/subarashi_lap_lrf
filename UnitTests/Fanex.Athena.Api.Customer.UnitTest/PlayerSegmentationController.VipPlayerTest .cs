using Fanex.Athena.Api.Base.UnitTests;
using Fanex.Athena.DataAccess.Core.Common.Interfaces;
using Fanex.Athena.Extension.Utility;
using Fanex.Athena.Model.Core.DTO.Common;
using Fanex.Athena.Model.Customer.DTO.PlayerSegmentation;
using Fanex.Athena.Model.Customer.MetaModel;
using Fanex.Athena.Service.Core.Common.Interfaces;
using Fanex.Athena.Service.Customer.Interfaces;
using Fanex.Athena.Service.StatelessCore.Interfaces;
using Fanex.Athena.UnitTest.Common.Helpers;
using Newtonsoft.Json;
using NSubstitute;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace Fanex.Athena.Api.Customer.UnitTest
{
    public partial class PlayerSegmentationControllerTest : BaseApiControllerHelperTest
    {
        [Test]
        public async Task GetVipPlayerList_WhenCall_ReturnCorrectResult()
        {
            using (var controller = CreateController())
            {
                // arrange
                var metaModel = new VipPlayerListMetaModel();
                var expectedResult = FakeHelper.Create<ApiPagingResult<PlayerInfo>>();

                _appSettings.IsUseCtsApi.Returns(true);
                _playerService.GetVipPlayerListAsync(metaModel).Returns(expectedResult);

                // action
                var result = await controller.GetVipPlayerList(metaModel);

                // assert
                Assert.That(JsonConvert.SerializeObject(result.Content), Is.EqualTo(JsonConvert.SerializeObject(expectedResult)));
            }
        }
    }
}