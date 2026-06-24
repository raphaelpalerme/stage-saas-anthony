/**
 * Configuration de la facturation de Pickify.
 * Ce fichier ne sera jamais écrasé par les mises à jour de Makerkit.
 *
 * ⚠️ Le PRIX AFFICHÉ vient du champ `cost`. Pour qu'un vrai paiement fonctionne,
 * il faudra remplacer le `id` du lineItem (le « price ID » Stripe, voir plus bas)
 * par celui de ton produit créé dans le dashboard Stripe.
 */
import { BillingProviderSchema, createBillingSchema } from '@kit/billing';

// Le fournisseur de paiement (stripe), lu depuis les variables d'environnement.
const provider = BillingProviderSchema.parse(
  process.env.NEXT_PUBLIC_BILLING_PROVIDER,
);

export default createBillingSchema({
  provider,
  products: [
    {
      id: 'pro',
      name: 'Pro',
      badge: `Populaire`,
      highlighted: true,
      description: 'Pour les joueurs qui veulent tout débloquer',
      currency: 'EUR',
      plans: [
        {
          name: 'Pro mensuel',
          id: 'pro-monthly',
          paymentType: 'recurring',
          interval: 'month',
          lineItems: [
            {
              // price ID Stripe du produit Pro (5 €/mois, mode test).
              id: 'price_1TloQZAadMHnCVelkug4kOLK',
              name: 'Pro',
              cost: 5,
              type: 'flat' as const,
            },
          ],
        },
      ],
      features: [
        'Toutes les features de Pickify',
        'Profil mis en avant',
        'Dispos illimitées',
      ],
    },
  ],
});
