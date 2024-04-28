import type { AddAccountModel } from '../../domains/usecases/add-account'
import type { AccountModel } from '../../domains/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
