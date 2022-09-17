import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { StoreService } from './store.service';

@Controller('store')
@UseInterceptors(BusinessErrorsInterceptor)
export class StoreController {

    constructor(private readonly storeService: StoreService) { }

}
