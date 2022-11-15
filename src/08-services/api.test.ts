// Service
import { serviceCallInversionOfControl } from './api';


describe('fetch api wrapper', () => {

    test('a basic fetch call', async () => {
        const mockFetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('success') } as Response));
        const serviceCall = serviceCallInversionOfControl(mockFetch);

        await serviceCall('http:www.example.com/api/getTitles');

        expect(mockFetch).toBeCalledTimes(1);
        expect(mockFetch).toBeCalledWith(
            expect.any(URL),
            {
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                method: 'GET',
            }
        );
    });

});
