import storeData from '@/data/store-data.json';

type MenuItem = {
  id: number;
  name: string;
  price: string;
  priceNum?: number;
  description: string;
  image: string;
  popular: boolean;
};

type OtherMenuItem = {
  name: string;
  price: string;
};

export default function Menu() {
  const menuItems: MenuItem[] = storeData.menu;
  const otherMenu: OtherMenuItem[] = storeData.otherMenu;
  const phone = storeData.phone;

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#F5F5DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12">
          <p className="text-[#CD853F] font-medium mb-2">MENU</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-4"
            style={{ fontFamily: "'Nanum Myeongjo', serif" }}
          >
            대표 메뉴
          </h2>
          <div className="w-16 h-1 bg-[#CD853F] mx-auto mb-4" />
          <p className="text-[#666] text-sm">
            행정안전부 선정 <span className="text-[#CD853F] font-semibold">착한가격업소</span>
          </p>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* 이미지 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* 인기 배지 */}
                {item.popular && (
                  <span className="absolute top-4 left-4 bg-[#CD853F] text-white text-xs font-bold px-3 py-1 rounded-full">
                    인기
                  </span>
                )}
              </div>

              {/* 정보 */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-[#333]">{item.name}</h3>
                  <span className="text-[#CD853F] font-bold text-sm whitespace-nowrap ml-2">
                    {item.price}
                  </span>
                </div>
                <p className="text-[#666] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 메뉴 안내 */}
        <div className="mt-10 bg-white rounded-2xl p-6 shadow-md">
          <h4 className="font-bold text-[#8B4513] mb-4 text-center">기타 메뉴</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {otherMenu.map((item, index) => (
              <div key={index} className="p-3 bg-[#FFF8DC] rounded-lg">
                <p className="font-medium text-[#333]">{item.name}</p>
                <p className="text-[#CD853F] font-bold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 문구 */}
        <p className="text-center text-[#999] text-sm mt-8">
          * 가격은 변동될 수 있습니다. 매장에 문의해주세요. ({phone})
        </p>
      </div>
    </section>
  );
}
