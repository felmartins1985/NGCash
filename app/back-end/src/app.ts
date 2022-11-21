import * as express from 'express';
import error from './middlewares/error';
import * as cors from 'cors';
import LoginController from './controllers/loginController';
import AccountController from './controllers/accountController';
import TransactionController from './controllers/transactionController';

import auth from './middlewares/auth';

class App {
  public app: express.Express;
  public loginController = new LoginController();
  public accountController = new AccountController();
  public transactionController = new TransactionController();

  // public matchController = new MatchController();
  // public leaderController = new LeaderController();
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.config();
    this.routes();
    this.app.use(error);
  }

  routes():void {
    this.app.get('/users', this.loginController.findAll.bind(this.loginController));
    this.app.post('/register', this.loginController.createUser
      .bind(this.loginController));
    this.app.post('/login', this.loginController.login.bind(this.loginController));
    this.app.get(
      '/account/:id',
      auth,
      this.accountController.findOneAccount.bind(this.accountController),
    );
    this.app.post(
      '/transaction',
      auth,
      this.transactionController.createTransaction.bind(this.transactionController),
    );
    this.app.get(
          '/transaction/:id',
          auth,
          this.transactionController.findTransactionsUser.bind(this.transactionController),
    )
    this.app.get(
      '/transaction/filter',
      auth,
      this.transactionController.filterTransaction.bind(this.transactionController),
    );
  // http://localhost:3001/transaction/filter?params=2&type=debitedAccountId
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
