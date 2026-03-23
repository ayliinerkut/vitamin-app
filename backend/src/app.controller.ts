import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('recommend')
  getRecommendation(@Query('q') query: string) {

    const data: any = {
      eye: {
        name: "Vitamin A",
        benefits: "Göz sağlığına iyi gelir",
        foods: ["Havuç", "Ispanak"],
        deficiency: "Görme problemleri"
      },
      strawberry: {
        name: "Vitamin C",
        benefits: "Bağışıklığı güçlendirir",
        foods: ["Çilek", "Portakal"],
        deficiency: "Hastalık riski artar"
      }
    };

    const result = data[query?.toLowerCase()] || {
      name: "Genel Vitamin",
      benefits: "Vücut için faydalı",
      foods: ["Sebzeler", "Meyveler"],
      deficiency: "Yorgunluk"
    };

    return {
      input: query,
      vitamin: result
    };
  }
}
