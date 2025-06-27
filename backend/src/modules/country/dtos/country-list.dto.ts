/**
 * @swagger
 * components:
 *   schemas:
 *     CountryListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         flag:
 *           type: string
 */
export class CountryListItemDto {
  id: string;
  name: string;
  iso: string;
}