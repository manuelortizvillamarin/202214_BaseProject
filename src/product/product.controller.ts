import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { ProductService } from './product.service';

@Controller('products')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductController {

    constructor(private readonly productService: ProductService) { }

}
