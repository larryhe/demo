/** @format **/
import { render, act, fireEvent, screen } from '@testing-library/react';
import StaticFeedback from '../StaticFeedback';
import * as API from '../API';
import * as Router from 'next/router';

describe('StaticFeedback test suites', () => {
    it('should render feedback component', async () => {
        jest.spyOn(API, 'load').mockResolvedValueOnce({
            patient: { firstName: 'ABC' },
            doctor: { lastName: 'XYZ' },
            diagnosis: 'Covid',
        });
        await act(async () => render(<StaticFeedback />));
        expect(document.body.innerHTML).toMatchInlineSnapshot(`
<div>
  <div class="feedback">
    <h3>
      Hi ABC, on a scale of 1-10, would you recommend Dr XYZ to a friend or family member? 1 = Would not recommend, 10 = Would strongly recommend
    </h3>
    <ul class="scale">
      <li>
        <button class>
          1
        </button>
      </li>
      <li>
        <button class>
          2
        </button>
      </li>
      <li>
        <button class>
          3
        </button>
      </li>
      <li>
        <button class>
          4
        </button>
      </li>
      <li>
        <button class>
          5
        </button>
      </li>
      <li>
        <button class>
          6
        </button>
      </li>
      <li>
        <button class>
          7
        </button>
      </li>
      <li>
        <button class>
          8
        </button>
      </li>
      <li>
        <button class>
          9
        </button>
      </li>
      <li>
        <button class>
          10
        </button>
      </li>
    </ul>
    <h3>
      You were diagnosed with Covid. Did Dr XYZ explain how to manage this diagnosis in a way you could understand?
    </h3>
    <div class="switch">
      <button class>
        Yes
      </button>
      <button class>
        No
      </button>
    </div>
    <h3>
      How do you feel about being diagnosed with Covid?
    </h3>
    <textarea rows="10"
              cols="60"
    >
    </textarea>
    <div>
      <button>
        Submit
      </button>
    </div>
  </div>
</div>
`);
    });
    it('data should be sent to API', async () => {
        const save = jest.spyOn(API, 'save').mockImplementation(jest.fn());
        jest.spyOn(API, 'load').mockResolvedValueOnce({
            patient: { firstName: 'ABC' },
            doctor: { lastName: 'XYZ' },
            diagnosis: 'Covid',
        });
        jest.spyOn(Router, 'useRouter').mockReturnValue({ push: jest.fn() });
        await act(async () => render(<StaticFeedback />));
        fireEvent.click(screen.getByText('10'));
        fireEvent.click(
            screen.getByRole('button', {
                name: /Yes/,
            }),
        );
        fireEvent.change(
            screen.getByText((content, element) => {
                return element.tagName.toLowerCase() === 'textarea';
            }),
            { target: { value: '10 and yes' } },
        );
        fireEvent.click(screen.getByText('Submit'));
        expect(save).toHaveBeenCalledWith(
            '/api/simple',
            expect.objectContaining({ scale: 10, yesNo: 1, input: '10 and yes' }),
        );
    });
});
