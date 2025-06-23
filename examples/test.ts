import { DexchangeClient } from '@dexchange/sdk';
import type {
  TransactionInitResponse,
  MerchantTransactionResponse,
  TransactionStatusResponse,
  WizallConfirmationResponse,
  ServicesResponse,
  BalanceResponse,
} from '@dexchange/sdk';

// Initialiser le client
const client = new DexchangeClient({
  apiKey: 'VOTRE_CLE_API',
  // Optionnel: changer l'URL de base
  // baseUrl: 'https://api-m.dexchange.sn'
});

// Fonction pour tester les différentes fonctionnalités
async function testerSDK(): Promise<void> {
  try {
    // 1. Initialiser une transaction Orange Money
    console.log("\n1. Test d'initiation de transaction Orange Money:");
    const transactionOM: TransactionInitResponse = await client.transaction.init({
      externalTransactionId: `ORDER-${Date.now()}`,
      serviceCode: 'OM_SN',
      amount: 1000,
      number: '771234567',
      callBackURL: 'https://votre-site.com/webhook',
      successUrl: 'https://votre-site.com/success',
      failureUrl: 'https://votre-site.com/failure',
    });
    console.log('Réponse:', transactionOM);

    // 2. Initialiser une transaction Wave
    console.log("\n2. Test d'initiation de transaction Wave:");
    const transactionWave: TransactionInitResponse = await client.transaction.init({
      externalTransactionId: `ORDER-${Date.now()}`,
      serviceCode: 'WAVE_SN',
      amount: 2000,
      number: '771234567',
      callBackURL: 'https://votre-site.com/webhook',
      successUrl: 'https://votre-site.com/success',
      failureUrl: 'https://votre-site.com/failure',
    });
    console.log('Réponse:', transactionWave);

    // 3. Créer un lien de paiement marchand
    console.log('\n3. Test de création de lien de paiement marchand:');
    const lienPaiement: MerchantTransactionResponse =
      await client.transaction.createMerchantPaymentLink({
        externalTransactionId: `ORDER-${Date.now()}`,
        ItemName: 'T-shirt Premium',
        ItemPrice: 5000,
        ClientName: 'John Doe',
        ClientPhone: '771234567',
        Email: 'client@example.com',
        callBackURL: 'https://votre-site.com/webhook',
        successUrl: 'https://votre-site.com/success',
        failureUrl: 'https://votre-site.com/failure',
      });
    console.log('Réponse:', lienPaiement);

    // 4. Vérifier le statut d'une transaction
    if (transactionOM.transaction.transactionId) {
      console.log('\n4. Test de vérification du statut:');
      const statut: TransactionStatusResponse = await client.transaction.getTransaction(
        transactionOM.transaction.transactionId
      );
      console.log('Réponse:', statut);
    }

    // 5. Obtenir la liste des services disponibles
    console.log('\n5. Test de récupération des services:');
    const services: ServicesResponse = await client.services.getServices();
    console.log('Services disponibles:', services);

    // 6. Vérifier le solde du compte
    console.log('\n6. Test de vérification du solde:');
    const solde: BalanceResponse = await client.services.getBalance();
    console.log('Solde:', solde);

    // 7. Exemple avec Wizall (si applicable)
    console.log('\n7. Test de confirmation Wizall:');
    const confirmationWizall: WizallConfirmationResponse = await client.transaction.confirmWizall({
      transactionId: 'TRANSACTION_ID',
      otp: '123456',
    });
    console.log('Réponse:', confirmationWizall);
  } catch (error: any) {
    console.error('\nErreur:', error.response?.data || error.message);
  }
}

// Exemple de gestion des webhooks
function gererWebhook(signature: string, payload: string, secret: string): void {
  const estValide = DexchangeClient.webhook.verifySignature(signature, payload, secret);
  if (estValide) {
    const donnees = JSON.parse(payload);
    console.log('Données du webhook:', donnees);

    // Gérer différents types d'événements
    switch (donnees.Status) {
      case 'SUCCESS':
        console.log('Transaction réussie !');
        break;
      case 'FAILED':
        console.log('Transaction échouée.');
        break;
      case 'PENDING':
        console.log('Transaction en attente...');
        break;
      default:
        console.log('Statut inconnu:', donnees.Status);
    }
  } else {
    console.error('Signature du webhook invalide !');
  }
}

// Exécuter les tests
console.log('Démarrage des tests du SDK DEXCHANGE...');
testerSDK()
  .then(() => {
    console.log('\nTests terminés !');
  })
  .catch((error) => {
    console.error('\nErreur lors des tests:', error);
  });
